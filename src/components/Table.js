import React, { useState, useEffect } from "react";

const Table = ({ currentUsers, search, onDelete, onEdit }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const query = search.toLowerCase();
    const filteredResult = currentUsers.filter((user) => {
      return user.id.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    });
    setFilteredUsers(filteredResult)
  }, [search, currentUsers]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = currentUsers.map((user) => user.id);
      setSelectedUser(allUserIds);
    } else {
      setSelectedUser([]);
    }
  };

  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedUser([...selectedUser, id]);
    } else {
      setSelectedUser(selectedUser.filter((userId) => userId !== id));
    }
  };

  const handleDeleteSelected = () => {
    onDelete(selectedUser);
    setSelectedUser([]); // Clear selection after deletion
  };

  const handleDeleteSingle = (id) => {
    onDelete([id]);
    setSelectedUser(selectedUser.filter((userId) => userId !==id));
  }

  const handleEditSingle = (user) => {
        onEdit(user);
  }

  console.log(search, "");

  return (
    <div>
      <table>
        <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                selectedUser.length === currentUsers.length &&
                currentUsers.length > 0
              }
            ></input>
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelect(e, user.id)}
                    checked={selectedUser.includes(user.id)}
                  ></input>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button style={{ marginRight: "10px" }} onClick={() => handleEditSingle(user)}>
                    <i className="far fa-edit"></i> Edit
                  </button>
                  <button style={{ color: "red", border: "1px solid red" }} onClick={() => handleDeleteSingle(user.id)}>
                    <i className="far fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            );
        })}
        </tbody>
      </table>
      <button onClick={handleDeleteSelected} style={{ color: "red", border: "1px solid red", marginTop: "20px" }}>
        Delete Selected
      </button>
    </div>
  );
};

export default Table;
