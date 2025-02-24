import React from 'react'; // Importing React library
import './Video.css'; // Importing CSS styles for the Video component
import video from '../../images/philippineTrip.mp4'; // Importing the video file
import location from '../../images/my-location.svg'; // Importing the location icon

const Video1 = () => {
  return (
    <div>
      <div className="hero"> {/* Container for the video and content */}
        <video className='back-video' autoPlay loop muted playsInline> {/* Video element with specific attributes */}
          <source src={video} type='video/mp4'/> {/* Source of the video */}
        </video>
        <div className="video-content"> {/* Container for the content overlaying the video */}
          <h1>El Nido</h1> {/* Title of the location */}
          <img 
            src={location} 
            style={{width:"30px", height:"30px", marginTop:"3px"}} 
            alt="" 
          /> {/* Location icon with inline styles */}
          <span> Palawan </span> {/* Location name */}
          <span>Available Now!</span> {/* Availability message */}
        </div>
      </div>
    </div>
  );
}

export default Video1; // Exporting the Video1 component for use in other parts of the application