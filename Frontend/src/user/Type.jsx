import React from "react";
import Typewriter from "typewriter-effect";

const Type=({String,deleteSpeed})=> {
  return (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        strings:String
        
      }}
    />
  );
}

export default Type;
