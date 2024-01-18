import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./read.css";
export default function Read() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/" + id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  console.log(user);
  return (
    <>
      <div className="container">
        <h1>User details</h1>

        <div>
          <p><strong>Name : </strong> {user.name}</p>
          <p><strong>Username : </strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <p><strong>Street : </strong> {user.address?.street}</p>
          <p><strong>Suite : </strong> {user.address?.suite}</p>
          <p><strong>City : </strong>{user.address?.city}</p>
          <p><strong>Zipcode : </strong>{user.address?.zipcode}</p>
          <p><strong>Phone : </strong>{user.phone}</p>
          <p><strong>Website : </strong>{user.website}</p>

          <p><strong>Company name : </strong>{user.company?.name}</p>
          <p><strong>Company Catchphrase : </strong>{user.company?.catchPhrase}</p>
          <p><strong>Company BS : </strong>{user.company?.bs}</p>
          <div className="button-container">
            <Link to={`/update/${id}`} className="read-edit">
              <button>Edit</button>
            </Link>

            <Link to="/" className="read-back">
              <button>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
