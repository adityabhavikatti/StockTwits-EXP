import React, { Component } from 'react';

export default class Background extends Component {
    
    constructor(){
        super();
        this.state = {
            tweets: []
        };
    }
    
    componentDidMount (){

        fetch('https://api.stocktwits.com/api/2/streams/symbol/amzn.json',  {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
        .then(results => {
            return results.json();
        }).then(data => {
            console.log(data)
            return(
                <div key={data}>
                    <h2>
                        {data.symbol.symbol}
                    </h2>
                    <h2>
                        {data.symbol.title}
                    </h2>
                </div>
            );

            // let tweets = data.results.map((msg) => {
            //     return(
            //         <div key={msg.results}>
            //             <p>
            //                {msg.messages.body} 
            //             </p>
            //         </div>
            //     )
            // })
            //this.setState({tweets: tweets});
            //console.log("tweets:", this.state.tweets);
            })
    }
    
    
    
    render () {
        return(
            <div>
               <ul>
                   {this.state.tweets.map(message => (
                       <li key={message.messages}>
                            {this.state.tweets.messages.key.body}
                       </li>
                   ))}
               </ul>
            </div>
        );
    }
}