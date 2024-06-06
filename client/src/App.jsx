import React, { useEffect } from "react";
import { io } from "socket.io-client";
const App = () => {
  const socket = io("http://localhost:3000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("COnnected", socket.id);
    });
    socket.on("welcome", (e) => {
      console.log(e);
    });
  }, []);
  return <div>App</div>;
};

export default App;
App;
