/* eslint-disable no-unused-vars */
// import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetAllUser, DeleteUser } from "../../../../services/userService";
import { useState, useEffect } from "react";
export default function ListAllCustomerTable() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const response = await GetAllUser();
        setUserData(response); // Assuming the API response is an array of schedules
        setLoading(false);
      } catch (err) {
        setError("Failed to load schedules");
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData
            ?.filter((user) => user.roleId === 2)
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>
                  <Link
                    to={`/admin/customer-management/details?userId=${user.id}`}
                  >
                    <Button variant="primary" className="me-2">
                      View
                    </Button>
                  </Link>
                  <Link
                    to={`/admin/customer-management/form?userId=${user.id}`}
                  >
                    <Button variant="outline-primary" className="me-2">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
