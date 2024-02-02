import React, { useState } from 'react';
import axios from 'axios';
import OpenAI from 'openai';

const AdComponent = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const openai = new OpenAI({
        apiKey: "", // API key here
        dangerouslyAllowBrowser: true
    });

    async function main() {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
        });
    }

    main();

    const generateResponse = async () => {
        try {
            const apiKey = process.env.OPENAI_API_KEY // Replace with your OpenAI API key
            const apiUrl = 'https://api.openai.com/v1/completions';
            const prompt = userInput;

            const { data } = await axios.post(apiUrl, {
                prompt,
                max_tokens: 50, // Adjust as needed
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            setResponse(data.choices[0].text);
        } catch (error) {
            console.error('Error generating response:', error);
        }
    };

    return (
        <div>
            <h1>OpenAI React App</h1>
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
};

export default AdComponent;
