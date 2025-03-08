const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const { searchUserByEmail, createUser } = require('./controllers/userController');
const minCashFlow = require('./utils/MinCashFlow');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow only specified HTTP methods
    credentials: true // Allow cookies and credentials
}));

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000', // Allow Socket.IO connections from this origin
        methods: ['GET', 'POST'],
        credentials: true
    }
});

mongoose.connect('', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log("hoo gya connection");
 })
 .catch((error) => {
    console.log("nhi hoo paya");
    console.error(error.message);
    process.exit(1);
 });

let graph = []; // Matrix to store expenses
let users = []; // List of users in the group

io.on('connection', (socket) => {
    console.log('A user connected');

    // Search for a user by email
    socket.on('searchUser', async (email, callback) => {
        const user = await searchUserByEmail(email);
        callback(user);
    });

    // Add a user to the group
    socket.on('addUserToGroup', (user) => {
        users.push(user);
        io.emit('groupUpdated', users);
    });

    // Split expense among selected members
    socket.on('splitExpense', ({ payerEmail, participantEmails, amount }) => {
        const payerIndex = users.findIndex((u) => u.email === payerEmail);
        const participants = participantEmails.map((email) =>
            users.findIndex((u) => u.email === email)
        );
        const share = amount / participants.length;
        participants.forEach((participant) => {
            graph[payerIndex][participant] += share;
        });
        io.emit('expenseUpdated', { graph, users });
    });

    // Calculate minimum cash flow
    socket.on('calculateCashFlow', () => {
        const result = minCashFlow(graph);
        io.emit('cashFlowResult', result);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 8080; // Change to a safe port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
