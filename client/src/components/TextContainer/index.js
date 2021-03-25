import React from "react";


import onlineIcon from "../../icons/onlineIcon.png";

const TextContainer = ({users}) => {
  return(
    <>
    {
      users ? (
        <div className="active-container">
          <h2>
            {users.map((name)=>(
              <div key={name} className="">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      ): null
  }
  </>
)
}
export default TextContainer;