import React from "react";
const Input = (message, setMessage, sendMessage) => {
  return (
    <form className="form">
      <input 
        className="input"
        type="text"
        placeholder="Mesajınızı giriniz ..."
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        onKeyPress={e=> e.key === 'Enter' ? sendMessage(e) : null}
        />
        <button className="send-message" onClick={(e)=> sendMessage(e)} >Gönder</button>
    </form>
  )
}

export default Input;