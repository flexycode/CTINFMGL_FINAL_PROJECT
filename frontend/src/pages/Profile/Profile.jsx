import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(false); 
  const [inputErrors, setInputErrors] = useState({}); 
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/user/getProfile", {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      setData(result.data);
      setEditedData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData(data);
  };

  const handleDoneClick = async () => {
    if (validateInputs()) {
      try {
        await axios.put(
          "http://localhost:8080/user/updateProfile",
          {
            username: editedData.username,
            phoneNumber: editedData.phoneNumber,
          },
          {
            headers: {
              authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsEditing(false);
      }
      fetchData();
    }
  };

  const validateInputs = () => {
    const errors = {};
    if (!editedData.username || editedData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }
    if (!editedData.phoneNumber || editedData.phoneNumber.length < 8) {
      errors.phoneNumber = "Phone number must be at least 8 digits long.";
    }
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div>
      <button className="profile-button-home" onClick={() => navigate("/")}>
        Go back Home
      </button>
      {data === null ? (
        <center>
          <span className="profile-loader"></span>
        </center>
      ) : (
        <div className="profile-container">
          <div className="profile-left-section">
            <div className="profile-data">
              <img alt="" />
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="username"
                    value={editedData.username || ""}
                    onChange={handleChange}
                    required
                    minLength={3}
                    placeholder="Enter username"
                  />
                  {inputErrors.username && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {inputErrors.username}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <span>Username: {data[0].username}</span>
                  {error && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      Username already exists.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="profile-right-section">
            <center>
              <h3
                style={{
                  marginBottom: "20%",
                }}
              >
                Information
              </h3>
            </center>
            <div className="email">
              <span
                style={{
                  borderBottom: "2px solid black",
                  width: "55px",
                  marginRight: "6px",
                  fontWeight: "600",
                }}
              >
                Email:
              </span>
              <span>{data[0].email}</span>
            </div>
            <div className="phone">
              <span
                style={{
                  borderBottom: "2px solid black",
                  width: "60px",
                  marginRight: "5px",
                  fontWeight: "600",
                }}
              >
                Phone:
              </span>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editedData.phoneNumber || ""}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={15}
                    placeholder="Enter phone number"
                  />
                  {inputErrors.phoneNumber && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {inputErrors.phoneNumber}
                    </p>
                  )}
                </div>
              ) : (
                <span>{data[0].phoneNumber}</span>
              )}
            </div>
          </div>
          {isEditing ? (
            <button className="profile-button" onClick={handleDoneClick}>
              Done
            </button>
          ) : (
            <button className="profile-button" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
