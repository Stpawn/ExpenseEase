import React from 'react';

function ResultDisplay({ result, users }) {
    return (
        <div>
            <h2>Cash Flow Result</h2>
            <ul>
                {result.map((transaction, index) => (
                    <li key={index}>
                        {users[transaction.from].name} pays {transaction.amount} to {users[transaction.to].name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResultDisplay;