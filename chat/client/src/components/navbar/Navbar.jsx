import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
// import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  // const { currentUser } = useContext(AuthContext);

  const [showNotifications, setShowNotifications] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(0);

  const handleNotificationClick = () => {
    // Toggle visibility of notification box
    setShowNotifications(!showNotifications);

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotifications(false);
    }, 2000);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="./logo.png" alt="logo" style={{ maxHeight: "25px", maxWidth: "150px", marginRight: "10px", verticalAlign: "baseline" }} />
          <span style={{ verticalAlign: "top" }}>Quantanglement</span>
        </Link>
        <NotificationsOutlinedIcon onClick={handleNotificationClick} />

        {/* <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      <div className="right">
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        {/* <div className="user">
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div> */}
      </div>
      {showNotifications && (
        <div className="notification-dropdown">
          <span className="background-text">No new notifications</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;