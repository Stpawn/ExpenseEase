import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CreateGroup from './components/CreateGroup';
import SplitExpense from './components/SplitExpense';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

const socket = io('http://localhost:8080', {
    transports: ['websocket'], // Force WebSocket transport
});

function App() {
    const [users, setUsers] = useState([]);
    const [graph, setGraph] = useState([]);
    const [cashFlowResult, setCashFlowResult] = useState([]);

    useEffect(() => {
        socket.on('groupUpdated', (updatedUsers) => {
            setUsers(updatedUsers);
            setGraph(Array.from({ length: updatedUsers.length }, () => Array(updatedUsers.length).fill(0)));
        });

        socket.on('expenseUpdated', ({ graph: updatedGraph, users: updatedUsers }) => {
            setGraph(updatedGraph);
            setUsers(updatedUsers);
        });

        socket.on('cashFlowResult', (result) => {
            setCashFlowResult(result);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="App">
            <h1>Easy Expense</h1>
            <CreateGroup socket={socket} />
            <SplitExpense socket={socket} users={users} />
            <ResultDisplay result={cashFlowResult} users={users} />
        </div>
    );
}

export default App;