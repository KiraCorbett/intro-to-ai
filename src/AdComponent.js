import React, { useState } from 'react';
import axios from 'axios';
import OpenAI from "openai";

const AdComponent = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    
    const apiKey = '';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const openai = new OpenAI({
        apiKey: '', // API key here
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
            'Organization': '',
        },
    };

    const generateResponse = async () => {

            axios.post(apiUrl, data, config)
            .then(response => {
              response.data.choices.forEach(choice => {
                console.log(choice.message.content); // comment out later
                setResponse(choice.message.content);
              })
            })
            .catch(error => {
                console.error('Error generating response', error);
            });
        }

    return (
        <div>
            <h1>Moon Highway Ad Generator</h1>
            <textarea
                value={userInput}
                onChange={handleUserInput}
                placeholder="Enter your prompt here"
            />
            <button onClick={generateResponse}>Generate Response</button>
            {response && (
                <div>
                    <h3>Generated Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
  }

export default AdComponent;