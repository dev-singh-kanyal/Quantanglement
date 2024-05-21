// Code this area for the Chat Interface

import { useContext, useEffect, useState } from "react"
import "./home.scss"
import { AuthContext } from "../../context/authContext"
import { SocketContext } from '../../context/socket'

const Message = ({ uname, message, mine = false, type = 'msg' }) => {
  return type === 'update' ? (
    <div style={{
      textAlign: 'center',
      color: '#999',
      fontSize: '12px',
      margin: '10px 0'
    }}>{message}</div>
  ) : (
    <div style={{
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: mine ? '#DCF8C6' : '#E6E6E6',
      wordWrap: 'break-word'
    }}>
      <div>
        <div style={{
          fontWeight: 'bold',
          marginBottom: '5px',
          color: '#333'
        }}>{uname}</div>
        <div style={{
          color: '#666'
        }}>{message}</div>
      </div>
    </div>
  )
}

const MessageInput = ({ value, onChange, onSubmit }) => {
  return (
    <div style={{
      display: 'flex',
      padding: '10px',
      backgroundColor: '#eee',
      borderTop: '1px solid #ccc'
    }}>
      <input onChange={onChange} value={value} type="text" id="message-input" style={{
        flex: '1',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginRight: '10px',
        boxSizing: 'border-box'
      }} />
      <button id="send-message" onClick={(e) => {
        e.preventDefault();
        onSubmit()
      }} style={{
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#5cb85c',
        color: 'white',
        cursor: 'pointer'
      }}
      >Send</button>
    </div>
  )
}

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '15px',
      textAlign: 'center',
      position: 'relative'
    }}>
      <h1 style={{
        fontSize: '20px',
      }}>Chat With All</h1>
      {/* <button style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        backgroundColor: '#d9534f',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer'
      }}>Exit</button> */}
    </header>
  )
}

const Messages = ({ children }) => {
  return (
    <div style={{
      padding: '20px',
      height: '60vh',
      overflowY: 'auto',
      backgroundColor: 'rgb(244, 244, 244)'
    }}>
      {children}
    </div>
  )
}


const Chat = () => {
  const { currentUser } = useContext(AuthContext)
  const socket = useContext(SocketContext)
  const [msgText, setMsgText] = useState('')

  const [msgs, setMsgs] = useState([])

  const handleMsgTextChange = (e) => {
    setMsgText(e.target.value);
  }

  const handleMsgSubmit = () => {
    if (!msgText) return;
    socket.emit("chat", { uname: currentUser.name, message: msgText });
    setMsgs(prev => ([
      ...prev, { uname: currentUser.name, message: msgText, type: 'msg' }
    ]))
    setMsgText('');
  }

  const handleUpdate = (update) => {
    console.log('new update', update)
    setMsgs(prev => ([
      ...prev, { message: update, type: 'update' }
    ]))
  }

  const handleChat = (chat) => {
    console.log('new chat', chat)
    setMsgs(prev => ([...prev, { ...chat, type: 'msg' }]))
  }

  useEffect(() => {
    socket.emit("newuser", currentUser.name)
    console.log('new user')

    socket.on("update", handleUpdate)
    socket.on("chat", handleChat)

    return () => {
      // handle unsubscribe
      socket.emit("exituser", currentUser.name);
    }
  }, [])

  return (
    <div className="home">
      <Header />
      <Messages>
        {msgs.map(({ uname, message, type }, i) => (
          <Message message={message} uname={uname} type={type} mine={uname === currentUser.name} key={i} />
        ))}
      </Messages>
      <MessageInput onChange={handleMsgTextChange} value={msgText} onSubmit={handleMsgSubmit} />
    </div>
  )
}

const Home = () => {
  return (
    <Chat />
  )
}

export default Home