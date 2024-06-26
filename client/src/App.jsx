import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField } from "@mui/material";
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState("");
  const [myRoom, setMyRoom] = useState("");
  const [messages, setMessages] = useState([]);
  console.log("messages : ", messages);
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
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
  };
  const handleJoinRoom = async () => {
    socket.emit("join_room",joinRoom)
    setJoinRoom("")
  };
  return (
    <div>
      <Container maxWidth="sm">
        <form>
          <h3>{myRoom && myRoom}</h3>
          <TextField
            onChange={(e) => setJoinRoom(e.target.value)}
            id="outlined-basic"
            label="Join Room"
            variant="outlined"
            value={joinRoom}
          />
          <Button onClick={handleJoinRoom} variant="contained" color="primary">
            Join
          </Button>
          <br />
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
        <div>
          {messages.length > 0 &&
            messages.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>
      </Container>
    </div>
  );
};

export default App;
App;
