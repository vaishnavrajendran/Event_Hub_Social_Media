// const io = require("socket.io")(8900,{
//     cors:{
//         origin:"http://localhost:3000"
//     }
// });
// let users = [];

// const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId && 
//         users.push({ userId, socketId }));
// };

// const removeUser = (socketId) => {
//     users = users.filter(user => user.socketId !== socketId);
// }

// const getUser = (userId) => {
//     return users.find(user => user.userId === userId)
// }

// io.on("connection", (socket) => {
//     // when connect
//     console.log("New user connected");
//     console.log("so",socket)

//     //take userId and socketId from user
//     socket.on("addUser",(userId) => {
//         addUser(userId, socket.id)
//         io.emit("getUsers", users)
//     }) 

//     //send and get message
//     socket.on("sendMessage",({senderId,receiverId,text}) => {
//         const user = getUser(receiverId);
//         io.to(user.socketId).emit("getMessage", {
//             senderId,
//             text
//         })
//     })

//     //when disconnect
//     socket.on("disconnect", () => {
//         console.log("a user disconnected!")
//         removeUser(socket.id)
//         io.emit("getUsers", users)
//     })
// }) 

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  console.log("user",users)
  
  const addUser = (userId, socketId) => {
    console.log("userID",userId); 
    console.log("socketId",socketId);
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
      console.log("userAdd",users)
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected."); 
    console.log("user",users)

  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      console.log("user",user)
      console.log("receiver",receiverId)
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      }); 
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      console.log("user",users)
      removeUser(socket.id); 
      io.emit("getUsers", users);
    });
  });