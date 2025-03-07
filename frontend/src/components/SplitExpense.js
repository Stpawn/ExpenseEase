import React, { useState } from 'react';

function SplitExpense({ socket, users }) {
    const [payerEmail, setPayerEmail] = useState('');
    const [participantEmails, setParticipantEmails] = useState([]);
    const [amount, setAmount] = useState(0);

    const handleSplitExpense = () => {
        socket.emit('splitExpense', { payerEmail, participantEmails, amount });
    };

    return (
        <div>
            <h2>Split Expense</h2>
            <select onChange={(e) => setPayerEmail(e.target.value)}>
                <option value="">Select Payer</option>
                {users.map((user, index) => (
                    <option key={index} value={user.email}>
                        {user.name}
                    </option>
                ))}
            </select>
            <select
                multiple
                onChange={(e) =>
                    setParticipantEmails(
                        Array.from(e.target.selectedOptions, (option) => option.value))
                    }
            >
                {users.map((user, index) => (
                    <option key={index} value={user.email}>
                        {user.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <button onClick={handleSplitExpense}>Split Expense</button>
        </div>
    );
}

export default SplitExpense;