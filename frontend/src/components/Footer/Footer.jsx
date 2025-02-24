import React from 'react'; 
import './Footer.css'; 
import github from '../../images/github.svg'; 
import linkedIn from '../../images/linkedin.svg'; 
import email from '../../images/gmail.svg'; 

// Footer functional component
const Footer = () => {
  return (
    <div className='main-footer'> {/* Main container for the footer */}
      <center> {/* Centering the content */}
        <table className="footer-table"> {/* Table to structure footer content */}
          <tbody>
            <tr className='header'> {/* Header row for the table */}
              <td>About Us</td> {/* Column for About Us section */}
              <td>Contact</td> {/* Column for Contact section */}
            </tr>
            <tr>
              <td>We are a team of passionate developers from the COM-231 Information Management course</td> {/* Description of the team */}
              <td>
                {/* Email link with icon */}
                <a href="mailto:flexycode.dev@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={email} style={{ width: "13px", height: "13px" }} alt="Email" /> 
                  <span>Email</span> {/* Text for Email link */}
                </a>
              </td>
            </tr>
            <tr>
              <td>This Full-Stack Flight Booking Application is a product of our collaborative efforts and dedication.</td> {/* Description of the application */}
              <td>
                {/* GitHub link with icon */}
                <a href="https://github.com/flexycode/CTINFMGL_FINAL_PROJECT" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={github} style={{ width: "13px", height: "13px" }} alt="GitHub" /> 
                  <span>GitHub</span> {/* Text for GitHub link */}
                </a>
              </td>
            </tr>
            <tr>
              <td>We hope you enjoy exploring our work!</td> {/* Closing statement */}
              <td>
                {/* LinkedIn link with icon */}
                <a href="https://www.linkedin.com/in/flexycode/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={linkedIn} style={{ width: "13px", height: "13px" }} alt="LinkedIn" /> 
                  <span>LinkedIn</span> {/* Text for LinkedIn link */}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
      <center><h5>All Rights Reserved 2025 ©</h5></center> {/* Copyright notice */}
    </div>
  );
}

export default Footer; // Exporting the Footer component for use in other parts of the application