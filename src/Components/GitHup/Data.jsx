import React, { Component } from 'react';
import getParams from '../GetParams'

class Data extends Component {
    
    constructor(props) {
        super(props);
        this.state = { user: [] };
        
        console.log('username', this.props.params.Id);
        const FetchUsers = async (user) => {
            const API_Call = await fetch(`https://api.github.com/search/users?q=${user}`);
            const data = await API_Call.json();
            return { data }
        }
        // initialize method
        FetchUsers(this.props.params.Id).then((res) => {
            this.setState({ user: res.data.items });
            console.log('the data', res.data.items);
        })
    }
    render() {
       return (
        <React.Fragment>
            <main role="main">
                <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">                   
                    <div className="col-md-3 cp">
                        <div className="card mb-4 shadow-sm">
                        <img className="bd-placeholder-img card-img-top" 
                        width="100%" height="225" 
                        src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                        alt=''/>
                        <div className="card-body">
                            <p className="card-text text-center">
                            Name : Ahmed
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-3 cp">
                    <div className="card mb-4 shadow-sm">
                        <img className="bd-placeholder-img card-img-top"
                        width="100%" height="225" src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                        alt=''/>
                        <div className="card-body">
                        <p className="card-text text-center">
                        Name : Ahmed
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 cp">
                    <div className="card mb-4 shadow-sm">
                        <img className="bd-placeholder-img card-img-top" 
                        width="100%" height="225" 
                        src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                        alt=''/>
                        <div className="card-body">
                        <p className="card-text text-center">
                        Name : Ahmed
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 cp">
                    <div className="card mb-4 shadow-sm">
                        <img 
                        className="bd-placeholder-img card-img-top"
                        width="100%" height="225" 
                        src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                        alt=''/>
                        <div className="card-body">
                        <p className="card-text text-center">
                        Name : Ahmed
                        </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 cp">
                    <div className="card mb-4 shadow-sm">
                        <img 
                        className="bd-placeholder-img card-img-top" 
                        width="100%" height="225" 
                        src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                        alt=''/>
                        <div className="card-body">
                        <p className="card-text text-center">
                        Name : Ahmed
                        </p>
                        </div>
                    </div>
                </div>  
                </div>
                </div>
                </div>
            </main>
        </React.Fragment>
        ) 
    }
    
}

export default getParams(Data) //getParams pasa los parametros al componente
