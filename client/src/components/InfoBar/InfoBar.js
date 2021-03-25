import React from 'react';

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png"

const InfoBar = ({room}) => {
  return(
    <div className="info-bar">
      <div className="left-inner-container">
        <img className="online-icon" src={onlineIcon} alt="online image" />
      </div>
      <idv className="right-inner-conatiner">
        <a href="/"><img src={closeIcon} alt="close image" /></a>
      </idv>
    </div>
  );
};

export default InfoBar;