import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState([]); //stores initial details
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users") // getting user information
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error.message));
  }, []);
  const handledelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      axios
        .delete("http://localhost:3000/users/" + id)
        .then(
          (
            res //delete user
          ) => {
            location.reload();
          }
        )
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <>
      <div className="head">
        <h1>List Of users</h1>
        <div className="add">
          <button>
            <Link
              to="/create"
              style={{ textDecoration: "none", color: "black" }}
            >
              ADD+
            </Link>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map(
              (
                item,
                index //display user information
              ) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.address?.street},{item.address?.city},
                    {item.address?.zipcode}
                  </td>
                  <td>{item.phone}</td>
                  <td>
                    {item.company?.name},{item.company?.catchPhrase},
                    {item.comapny?.bs}
                  </td>
                  <td>
                    {/* //CURD OPERATIONS BUTTONS */}
                    <div className="button">
                      <Link to={`/read/${item.id}`}>
                        <button className="read">Read</button>
                      </Link>
                      <Link to={`/update/${item.id}`}>
                        <button className="edit">Edit</button>
                      </Link>
                      <button
                        className="delete"
                        onClick={() => {
                          handledelete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <br />
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
