import React, { useCallback, useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const LobbyScreen = function () {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    function (e) {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );
  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );
  useEffect(() => {
    socket.on("room:join", handleJoinRoom, [socket]);
  });
  return (
    <div>
      <h1> lobby</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "4px 6px", margin: "0 2px" }}
          />
        </div>
        <div style={{ padding: "2rem" }}>
          <label htmlFor="room" style={{ margin: "0 2px" }}>
            Room ID
          </label>
          <input
            type="text"
            id="rooms"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{ padding: "4px 6px", margin: "0 2px" }}
          />
        </div>
        <button>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
