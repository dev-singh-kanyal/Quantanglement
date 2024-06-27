import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Group Members</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://avatars.githubusercontent.com/u/0"
                alt=""
              />
              <p>
                <span>Shimon Shiromani</span>
              </p>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://avatars.githubusercontent.com/u/97887912?v=4"
                alt=""
              />
              <p>
                <span>Priya Sinha</span>
              </p>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://avatars.githubusercontent.com/u/72750263?v=4"
                alt=""
              />
              <p>
                <span>Sherine Horo</span>
              </p>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Online Peers</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://avatars.githubusercontent.com/u/77870205?v=4"
                alt=""
              />
              <div className="online" />
              <span>Dev Singh Kanyal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
