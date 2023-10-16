const { Server } = require("socket.io")
const express = require("express");

const io = new Server(8000, {
    cors: true
});

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();


io.on("connection", (socket) => {
    console.log(`client connected successfully`, socket.id);
    socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketIdToEmailMap.set(socket.id, email);
        io.to(socket.id).emit('room:join', data);

    })
});

io.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
});
