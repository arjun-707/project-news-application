import React, { Component } from 'react';

export class NewsDescription extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <div className="col-md-6">
                    {
                        this.props.selected_news ? 
                            <table className="table table-striped news-list-table">
                                <thead>
                                    <tr>
                                        <th id={this.props.selected_news}>{this.props.selected_news}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    { 
                                        <td><img src={this.props.img} alt="" className="desc-img"/></td>
                                    }
                                    </tr>
                                    <tr>
                                    { 
                                        <td>{this.props.description}</td>
                                    }
                                    </tr>
                                </tbody>
                            </table>
                        :
                        ''
                    }
                </div>
        )
    }
}
  
export default NewsDescription;