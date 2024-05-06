import "./leftBar.scss";
import Peers from "../../assets/peers.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { makeRequest } from "../../axios";

const LeftBar = () => {
  const { currentUser, login } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await makeRequest.post("auth/logout");
      // Clear user data from local storage and update context
      localStorage.removeItem("user");
      login(null);
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
              // src={"/upload/" + currentUser.profilePic}
              src={"https://avatars.githubusercontent.com/u/77870205?v=4" + currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="user">
            <img src={Peers} alt="" />
            <span>Peers</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Groups</span>
          <div className="item">
            {/* <img src={Group1} alt="" /> */}
            <span>Quantum Cryptography</span>
          </div>
          <div className="item">
            <span>AI/ML</span>
          </div>
          <div className="item">
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
