import express from 'express';
import * as url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import { Server } from "socket.io";

const app = express();
const server = app.listen(3000, ()=>{console.log('Server starts on http://localhost:3000')});

const io = new Server(server,{
    cors: { origin:"*" }
});

io.on('connection',socket=>{
    socket.on('message',message=>{
        console.log(message);
    })
    socket.on('video',video=>{
        // console.log(video);
        socket.broadcast.emit('video',video);
        // io.emit('video',video);
    })
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})
