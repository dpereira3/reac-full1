import React, { Component } from 'react';

class Repose extends Component {
    constructor(props) {
        super(props);
        this.state = { repos: [] }

        const FetchRepose = async (user) => {
            const API_Call = await fetch(`https://api.github.com/users/${user}/repos?sort=created&per_page=5&page=1`)
            const data = await API_Call.json();
            return { data }
            
        }

        FetchRepose(props.user).then((res) => {
            
            if(res.data.length > 0 & !res.data.message) {
                let items = [];
                for(let i = 0 ; i < 5 ; i++) {
                    //console.log(res.data[i])
                    items.push(res.data[i])
                }
                this.setState({ repos: items })
            }
            //console.log(this.state.repos);
        })
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <h3>here Last 5 repo</h3>
                        <div className="lastfiveRepo">
                            { this.state.repos.map( res => (
                                <div key= {res.id}>
                                    <a key={res.id} href={res.html_url}> { res.name } </a> 
                                </div>
                            ))}
                        </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Repose;