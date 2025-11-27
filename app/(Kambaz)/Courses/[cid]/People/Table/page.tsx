/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "../Details";
import * as client from "../../../client";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!cid) return;
    try {
      const courseUsers = await client.findUsersForCourse(cid as string);
      setUsers(courseUsers);
    } catch (error) {
      console.error("Error fetching users for course:", error);
    }
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div id="wd-people-table">
      <h3>People</h3>

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

      <Table striped>
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
          {users
            .filter((user: any) => user != null) // ✅ Add this line
            .map((user: any) => (
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