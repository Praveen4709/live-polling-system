import { io } from "socket.io-client";

const socket = io("https://live-polling-system-bxq2.onrender.com"); // backend URL
export default socket;
