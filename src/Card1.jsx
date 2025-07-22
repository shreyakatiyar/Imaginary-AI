/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Card1 = ({ text, imageUrl }) => {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px',
    transition: 'transform 0.3s ease',
    maxWidth:'90%', 
  };

  const textStyle = {
    flex: '1',
    padding: '20px',
    textAlign: 'left',
    minWidth: '60%', 
    lineHeight: '1.6',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.1em',
  };

  const imageStyle = {
    flex: '1',
    minWidth: '40%',
    height: 'auto',
    textAlign: 'right',
    transition: 'transform 0.3s ease', // Animation for image hover effect
    borderRadius: '10px', // Rounded corners for image
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px' // Shadow effect
  };

  const imageHoverStyle = {
    transform: 'scale(1.05)', // Scale up on hover
  };

  return (
    <div style={cardStyle}>
         <div style={{ textAlign: 'right', overflow: 'hidden' }}>
        <img
          src={imageUrl}
          alt="Card Image"
          style={{ ...imageStyle }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>
      <div style={textStyle}>
        <p style={{ marginBottom: '10px' }}>{text}</p>
        <a style={{ color: '#007BFF', textDecoration: 'none', cursor:"pointer" }}>Read more</a>
      </div>
     
    </div>
  );
};

export default Card1;
