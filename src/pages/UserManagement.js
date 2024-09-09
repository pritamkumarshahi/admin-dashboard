import React, { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import Notification from "../components/notification";
import Table from "../components/Table";

import SearchBar from "../components/search-bar/SearchBar";
import EditUserModal from "../components/edit-modal/EditUserModal";
import TileLayout from "../components/Layout/TileLayout";

import "../App.css";


const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [showNotification, setShowNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          setUsers(data);
          setLoading(false); // Stop loading after the timeout
        }, 2000); // Set a 2-second delay (2000ms)
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const setSearchEvent = (value) => {
    setSearch(value);
  };

  const onDelete = (selectedUser) => {
    const updatedUsers = users.filter((user) => !selectedUser.includes(user.id));
    setUsers(updatedUsers);
    setShowNotification(true);

  };

  const handleSaveEdit = (updatedUser) => {
    console.log(updatedUser, "updatedUser")
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <TileLayout isLoading={loading}>
      <SearchBar setSearch={setSearchEvent} />
      <Table currentUsers={currentUsers} search={search} onDelete={onDelete} onEdit={handleEdit}
      />

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {showNotification && (
        <Notification
          message="Delete successful!"
          type="success"
          duration={3000}
          onClose={() => setShowNotification(false)}
        />
      )}
      <EditUserModal
        user={editingUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </TileLayout>

  );
}

export default UserManagement;
