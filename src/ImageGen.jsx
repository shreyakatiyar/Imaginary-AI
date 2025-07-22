/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './ImageGen.css';
import Api from './api';
import download from "./assets/download-icon-white-png-1.png";
import { Link } from 'react-router-dom';

const ImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const generateImage = async () => {
    try {
      setLoading(true);
      if (prompt === '') {
        console.log('prompt is null');
      } else {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/prompthero/openjourney",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${Api}`
            },
            body: JSON.stringify({ inputs: prompt }),
          }
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (image === null) {
      console.log('image is null');
    } else {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'imagepromt-ai.jpg'; 
      link.click();
    }
  };

  const genBtnStyle = {
    opacity: prompt ? 1 : 0.5,
    cursor: prompt ? 'pointer' : 'not-allowed',
  };

  const downBtnStyle = {
    opacity: image ? 1 : 0.5,
    cursor: image ? 'pointer' : 'not-allowed',
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission
      generateImage(event);
    }
  };

  return (
    <div className='aiImage'>
      <div className="header">Image-Generation<span> AI</span></div>
      <div className='search'>
        <div className='downBtn' style={downBtnStyle} onClick={handleDownload}><img src={download} alt='' /></div>
        <input 
          type='text' 
          className='searchInput' 
          placeholder='Type your prompt...' 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className='genBtn' style={genBtnStyle} onClick={generateImage}>
          {loading ? 'Generating...' : 'Generate'}
        </div>
      </div>
      <Link to={"/"}>
      <div className='genBtn1'>Back To Home Page</div>
      </Link>
      <div className='imgArea'>
        {image && <div className="genImage"><img src={image} alt='' /></div>}
      </div>
    </div>
  );
};

export default ImageGen;
