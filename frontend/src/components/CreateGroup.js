import React, { useState } from 'react';

function CreateGroup({ socket }) {
    const [email, setEmail] = useState('');

    const handleSearchUser = async () => {
        socket.emit('searchUser', email, (user) => {
            if (user) {
                socket.emit('addUserToGroup', user);
            } else {
                alert('User not found!');
            }
        });
    };

    return (
        <div>
            <h2>Create Group</h2>
            <input
                type="email"
                placeholder="Search user by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSearchUser}>Add User</button>
        </div>
    );
}

export default CreateGroup;