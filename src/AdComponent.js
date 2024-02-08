import React, { useState } from 'react';
import axios from 'axios';
import OpenAI from "openai";
import './AdComponent.css';

const AdComponent = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [typing, setTyping] = useState(false);
    
    const apiKey = ''; // Your API key here
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const openai = new OpenAI({
        apiKey: '', // Your API key here
        dangerouslyAllowBrowser: true
    });

    const data = {
        max_tokens: 50, // Adjust as needed
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }]
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
    };

    const generateResponse = async () => {
      setTyping(true);

      axios.post(apiUrl, data, config)
      .then(response => {
        response.data.choices.forEach(choice => {
          console.log(choice.message.content); // comment out later
          setResponse(choice.message.content);
        })
      })
      .catch(error => {
          console.error('Error generating response', error);
      })
      .finally(() => {
        setTyping(false);
      });
  }

    return (
        <div className="ad-container">
            <h1 className="ad-title">Moon Highway Ad Generator</h1>
            <textarea
                className="ad-textarea"
                value={userInput}
                onChange={handleUserInput}
                placeholder="Enter your prompt here"
            />
            <button className="ad-button"onClick={generateResponse}>Generate Response</button>
            {typing && <p>Typing...</p>}
            {response && (
                <div>
                    <h3>Generated Ad:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
  }

export default AdComponent;