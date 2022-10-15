import React, { useState, Fragment } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";

const App = () => {
  // Data
  const usersData = [
    { id: 1, name: "ALB-RS-001", username: "Readiness support to Albania" },
    { id: 2, name: "CRI-RS-002", username: "Building sub-national " },
    { id: 3, name: "DOM-RS-002", username: "Building capacity" },
  ];

  const initialFormState = { id: null, name: "", username: "" };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);

    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  return (
    <div className="container">
      <h1>Project Dashboard View</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Update Project</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add Project</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View Project</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
