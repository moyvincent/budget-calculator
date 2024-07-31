import React from "react";
import Topnav from "./Topnav";
import ProfileHeader from "./ProfileHeader";

const Header = () => {
  return (
    <header>
      <div className="site-identity">
        <h2>Budget Calculator</h2>
      </div>
      <Topnav />
      <ProfileHeader />
    </header>
  );
};

export default Header;
