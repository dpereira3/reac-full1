import React, { Component } from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    render() {
        return (
            <React.Fragment>
                <form className="form-Reigester">
                    <h4 className="h3 mb-3 font-weight-normal grey">Reigester</h4>
                    <input name="name" type="text" id="inputname" className="form-control" placeholder="Name" />
                    <input name="email" type="email"  className="form-control" placeholder="Email address" />
                    <input name="password" type="password"  className="form-control" placeholder="Password" />
                    <button className="btn btn-md btn-success btn-block" type="submit">Reigester</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Register;