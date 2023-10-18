import { useState } from "react";
import React, { useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../services/peer";

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      console.log(`Incoming cal ${from} : ${JSON.stringify(offer)}`);
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted");
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
    },
    [myStream]
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream);
    });

    // return () => {
    //   peer.peer.removeEventListenerListener("track", async (ev) => {
    //     const remoteStream = ev.streams;
    //     setRemoteStream(remoteStream);
    //   });
    // };
  }, []);
  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);
  const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
    const ans = await peer.getAnswer(offer);

    socket.emit("peer:nego:done", { to: from, ans });
  }, []);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, []);
  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);
  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:done", handleNegoFinal);

    return () => {
      socket.off("call:accepted", handleCallAccepted);
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:done", handleNegoFinal);
    };
  }, [
    socket,
    handleCallAccepted,
    handleUserJoined,
    handleIncomingCall,
    handleNegoNeedIncoming,
    handleNegoFinal,
  ]);
  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room "}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <div>
          <h3> My Stream</h3>

          <ReactPlayer
            playing
            muted
            url={myStream}
            width={"400px"}
            height={"200px"}
          />
        </div>
      )}
      {remoteStream && (
        <div>
          <h3> Remote Stream</h3>

          <ReactPlayer
            playing
            muted
            url={remoteStream}
            width={"400px"}
            height={"200px"}
          />
        </div>
      )}
    </div>
  );
}

export default Room;
