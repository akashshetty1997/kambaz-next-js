/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useEffect, useCallback } from "react";
import { FormControl, Table } from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import PeopleDetails from "../../Courses/[cid]/People/Details";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  }, []);

  const createUser = async () => {
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `newuser${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      setUsers([...users, user]);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h3>Users</h3>

      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
          fetchUsers={fetchUsers}
        />
      )}

      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        People
      </button>

      <FormControl
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role mb-3"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div className="clearfix"></div>

      <Table striped id="wd-people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowDetails(true);
                    setShowUserId(user._id);
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity || "N/A"}</td>
              <td className="wd-total-activity">
                {user.totalActivity || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
