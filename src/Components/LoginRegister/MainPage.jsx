import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

const PORT = process.env.REACT_APP_PORT || 4000;
const URL_backend = `${process.env.REACT_APP_URL_BACKEND}/api/users` || `http://localhost:${PORT}/api/users`;

class LoginRegister extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    componentDidMount(){
        console.log('main: ', URL_backend);
    }
    

    render() {
        return (
            <React.Fragment>
                <center>
                    <section className="Specific">
                        <div className="main" id="main">
                            <div className="container">
                                <div className="row">
                                <div className="col-lg-12 col-md-12">

                                    <Login props={this.props} URL_backend={URL_backend} />
                                    
                                    <Register props={this.props} URL_backend={URL_backend} />
                                    

                                </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </center>
  
            </React.Fragment>
        );
    }
}

export default LoginRegister;