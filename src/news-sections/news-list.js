import React, { Component } from 'react';
import { NewsDescription } from "./news-description";

export class NewsList extends Component {
    constructor(props) {
        super(props)
        this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        this.getPublishedDateTime = this.getPublishedDateTime.bind(this)
        this.showNewsDescription = this.showNewsDescription.bind(this)
        this.data = {}
        this.state = {
            selected_news: false,
            description: false,
            img: false,
            favourite: '',
            data: this.data
        }
        this.addIndex = this.addIndex.bind(this)
    }
    render() {
        return (
            <div className="col-md-9 news-list">
                <div className="row">
                    {   
                        (this.props.news_list.length > 0) ?
                            <div className="col-md-6">
                                <table className="table table-striped news-list-table">
                                    <thead>
                                        <tr>
                                            <th id={this.props.selected_list}>{this.props.selected_list}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {   
                                            this.props.news_list.map((data, index) => {
                                                this.data[index] = {
                                                    title: data.title,
                                                    description: data.content,
                                                    img: data.urlToImage
                                                };
                                                return <tr key={index} id={index}>
                                                    <td id={index}>
                                                        <div className="row" id={index}>
                                                            <div className="col-md-3" id={index}>
                                                            {
                                                                data.urlToImage ?
                                                                    <img src={data.urlToImage} className="news-img" id={index} onClick={this.showNewsDescription}/>
                                                                :
                                                                "no image"
                                                            }
                                                            </div>
                                                            <div className="col-md-9" id={index}>
                                                                <h6 id={index} onClick={this.showNewsDescription}>
                                                                    {data.title}
                                                                </h6>
                                                                <p id={index}>
                                                                    <small id={index}>
                                                                        <b id={index}>Published At: </b>
                                                                    </small> 
                                                                    { 
                                                                        this.getPublishedDateTime(data.publishedAt) 
                                                                    }
                                                                </p>
                                                                <span className={"glyphicon glyphicon-star "+
                                                                    this.state.data[index].favourite
                                                                } onClick={this.addIndex} id={index} data-toggle="tooltip" title="favourite"></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            }) 
                                        }
                                    </tbody>
                                </table>
                            </div>
                        :
                        this.props.wait
                    }
                    <NewsDescription selected_news={this.state.selected_news} description={this.state.description} img={this.state.img} favourite={this.state.favourite}/>
                </div>
            </div>
        );
    }
    addIndex(event) {
        this.data[event.target.id].favourite = 'glyphicon glyphicon-star star-green';
        this.showNewsDescription(event);
    }
    getPublishedDateTime(inputDate) {
        if (inputDate != undefined && inputDate != '') {
            let publDat = new Date(inputDate);
            let year = publDat.getFullYear();
            let month = this.months[publDat.getMonth()];
            let date = publDat.getDate();
            let hour = publDat.getHours();
            let min = publDat.getMinutes();
            let sec = publDat.getSeconds();
            let finalDattime = ( (date<10)?'0'+date:date) + ',' + ( (month<10)?'0'+month:month) + ' ' + year + ' ' + ( (hour<10)?'0'+hour:hour) + ':' + ( (min<10)?'0'+min:min) + ':' + ( (sec<10)?'0'+sec:sec) ;
            return finalDattime;
        }
        return '';
    }
    showNewsDescription(event) {
        this.setState(
            {
                selected_news: this.data[event.target.id].title,
                description: this.data[event.target.id].description,
                img:  this.data[event.target.id].img,
                favourite: this.data[event.target.id].favourite,
                data: this.data
            }
        )
    }
}
  
export default NewsList;