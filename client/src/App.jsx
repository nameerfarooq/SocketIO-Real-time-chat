import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("COnnected", socket.id);
    });
    socket.on("welcome", (e) => {
      console.log(e);
    });
    socket.on("receive-message", (message) => {
      console.log(message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("message", message);
  };
  return (
    <div>
      <Container maxWidth="sm">
        

        <form>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={message}
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default App;
App;
