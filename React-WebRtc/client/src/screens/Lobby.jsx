import React, { useCallback, useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = function () {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const handleSubmit = useCallback(
    function (e) {
      e.preventDefault();
      socket.emit("room:join", { email, room });
      console.log({ email, room });
    },
    [email, room, socket]
  );
  useEffect(() => {
    socket.on(
      "room:join",
      (data) => {
        console.log(`Data from BE ${JSON.stringify(data)}>}`);
      },
      [socket]
    );
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
