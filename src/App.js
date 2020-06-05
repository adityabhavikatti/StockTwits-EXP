import React, { useState } from 'react';
//import Background from "./components/background"
import axios from 'axios';
import './App.css';
import './styles.css'

function App() {
  const [stox, setStox] = useState(null);

  const fetchData = async () => {
    const response = await 
    fetch('https://api.stocktwits.com/api/2/streams/symbol/amzn.json',  {
        method: "GET",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
    .then(results => {
        return results.json();
    }).then(data => {
        console.log(data)
        setStox(data);
    });
  };

  return (
    <div className="App">
      <h1>Stocktwits Tweets</h1>
      <h2>Fetch tweets from an API and display it</h2>

      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* Display data from API */}
      <div className="tweets">
        {stox &&
          stox.messages.map((tweet, index) => {
            const cleanedDate = new Date(tweet.created_at).toDateString();

            return (
              <div className="tweet" key={index}>
                <h2>Tweet {index + 1}</h2>
                <h3>$AMZN</h3>

                <div className="details">
                  <p>👨: {tweet.user.name}</p>
                  <p>📖: {tweet.body}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}


export default App;
