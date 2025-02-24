import React, { useState } from 'react';
import axios from 'axios';
import './Admin_Add.css';

const Admin_Add = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const flightData = {
      from,
      to,
      date,
      duration,
      price,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/flight/addFlight',
        flightData,
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log('Response:', response.data);
      setMessage('Flight added successfully!');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error adding flight:', error);
      setMessage('Failed to add flight. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Add New Flight</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            className="admin-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="to">To</label>
          <input
            type="text"
            id="to"
            className="admin-input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            className="admin-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            className="admin-input"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            className="admin-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="admin-submit-button">Add Flight</button>
      </form>

      {message && (
        <center>
          <div style={{ color: isSuccess ? 'green' : 'red' }}>{message}</div>
        </center>
      )}
    </div>
  );
};

export default Admin_Add;
