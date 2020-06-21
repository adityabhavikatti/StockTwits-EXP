import React, { useState } from 'react';
//import Background from "./components/background"

import './App.css';
import './styles.css';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://api.stocktwits.com/api/2/streams/symbol/amzn.json";


function App() {
  const [stox, setStox] = useState(null);

  const fetchData = async () => {
    await fetch(proxyurl + url,  {
        method: "GET",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
    .then(results => {
        return results.json();
    }).then(data => {
        setStox(data);
        setTimeout(() => fetchData(), 50000);
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
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
                <span role="img" aria-label="Person">👨 : {tweet.user.name}</span><br />
                <span role="img" aria-label="Person">📖 : {tweet.body}</span><br />
                <span role="img" aria-label="Person">⏰ : {cleanedDate}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}


export default App;
