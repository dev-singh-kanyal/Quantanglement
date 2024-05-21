import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/" + currentUser.name + ".png"}
              // src={"link" + currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Groups</span>
          <div className="item" onClick={() => { window.location.href = 'http://localhost:8001'; }}>
            <span>Quantum</span>
          </div>
          <div className="item" onClick={() => { window.location.href = 'http://localhost:8002'; }}>
            <span>AI</span>
          </div>
          <div className="item" onClick={() => { window.location.href = 'http://localhost:8003'; }}>
            <span>IOT</span>
          </div>
        </div>
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            <LogoutOutlinedIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
