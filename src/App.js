import React, { Component } from 'react';
import './App.css';
import { NewsSource } from "./news-sections/news-sources.js";
class App extends Component {
    constructor() {
        super()
        this.state = {
            sources: []
        }
        this.getNewsSources = this.getNewsSources.bind(this)
        this.getNewsSources()
    }
    
    render() {
        return (
        <div className="App container-fluid">
            <NewsSource list =  {this.state.sources}/>
        </div>
        );
    }
    getNewsSources() {
        fetch('https://newsapi.org/v2/sources?apiKey=c7ec4bfc19a04d93a5745aad6ac3715e')        
        .then(response => 
            response.json()
        )
        .then((response) => {
            if (response.status == "ok") {
                this.setState({sources: response.sources})
            }
        })
        .catch(console.log)
    }
}

export default App;
