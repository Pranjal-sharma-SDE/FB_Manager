import React from 'react'
import apiHandler from '../api/apiHandler'


const Connect = () => {
    const handleConnectClick = () => {

        apiHandler.facebookConnect().then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    //   window.location.href = 'http://localhost:3001/api/auth/facebook'; // Redirect to the Facebook authentication route on the server
    };
  
    return (
      <div>
        <button onClick={handleConnectClick}>Connect Your FB</button>
      </div>
    );
  };

export default Connect
