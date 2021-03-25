import React from "react";

import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let isSentBycurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentBycurrentUser = true;
  }
  return isSentBycurrentUser ? (
    <div className="message-container justify-end">
      <p className="sent-text">{trimmedName}</p>
      <div className="message-box background-blue">
        <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="message-container justify-start">
      <div className="message-box baackground-light">
        <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sent-text pl-10">{user}</p>
    </div>
  );
};

export default Message;
