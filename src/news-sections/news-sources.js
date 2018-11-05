import React, { Component } from 'react';
import { NewsList } from "./news-list.js";

export class NewsSource extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news_list: [],
            selected_list: "",
            wait:""
        };
        this.fetchNews = this.fetchNews.bind(this)
    }
    render() {
        return (
            <div className="row source">
                <div className="col-md-3">
                    <table className="table table-striped source-list">
                        <thead>
                            <tr>
                                <th id="all-sources">All Sources</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.list.length > 0 ?
                                    this.props.list.map((data, index) => {
                                        return <tr key={index}>
                                            <td>
                                                <button className="btn btn-primary news-source" type="button"  onClick={this.fetchNews} id={data.id}>
                                                    {data.name}
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                :
                                <tr><td>Loading...</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
                <NewsList news_list={this.state.news_list} selected_list={this.state.selected_list} wait={this.state.wait}/>
            </div>
        );
    }
    fetchNews(event) {
        let id = event.target.id;
        let text = event.target.innerHTML;
        this.setState({news_list: [], selected_list: ''})
        fetch('https://newsapi.org/v2/top-headlines?sources='+id+'&apiKey=c7ec4bfc19a04d93a5745aad6ac3715e')
        .then(response => 
            response.json()
        )
        .then((response) => {
            if (response.status == "ok") {
                this.setState({news_list: response.articles, selected_list: text })
            }
        })
        .catch(console.log)
    }
}
  
export default NewsSource;