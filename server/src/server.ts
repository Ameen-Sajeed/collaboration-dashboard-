// import app from "./app";

// const PORT = 3001;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// socket io Implementation 

import http from "http";
import { Server } from "socket.io";

import app from "./app";

const PORT = 3001;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

io.on("connection", (socket) => {

  console.log("Client Connected");

});