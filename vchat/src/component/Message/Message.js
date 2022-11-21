import React from 'react'
import "./Message.css";
const Message = ({user,message,classs}) => {
    if(user){
        return (
            <div className={`messagebox ${classs}`}>
                {`${user}:${message}`}
            </div>
          )  
    }
    return (
    <div className={`messagebox ${classs}`}>
        {`You: ${message}`}
    </div>
  )
}

export default Message