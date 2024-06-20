import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField } from "@mui/material";
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [myRoom, setMyRoom] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("COnnected", socket.id);
      setMyRoom(socket.id);
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
    socket.emit("message", { message, room });
  };
  return (
    <div>
      <Container maxWidth="sm">
        <form>
          <h3>{myRoom && myRoom}</h3>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            id="Messagec"
            label="Message"
            variant="outlined"
            value={message}
          />
          <TextField
            onChange={(e) => setRoom(e.target.value)}
            id="outlined-basic"
            label="Room"
            variant="outlined"
            value={room}
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
