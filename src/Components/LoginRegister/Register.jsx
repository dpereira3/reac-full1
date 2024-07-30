import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = { 
            name: '',
            email: '',
            password: '',
            errors: ''
         };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    Register = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        const Data = { 
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post(`${this.props.URL_backend}/Register`, {Data})
        .then(res => {
            const err = res.data.message;
            this.setState({ errors:err })
            if(!err){
                alert('Successfully registered');
                const em = this.state.email;
                const pass = this.state.password;
                this.setState({ email: em, password: pass })
            }
        })
        .catch((err) => { console.log(err) });
    }

    render() {
        return (
            <React.Fragment>
                { this.state.errors ? <i className='alert alert-danger'>
                    {this.state.errors}
                </i>
                : 
                ''
                }
                <hr></hr>
                <form className="form-Reigester">
                    <h4 className="h3 mb-3 font-weight-normal grey">Register</h4>
                    <input value={this.state.name} onChange={this.onChange} name="name" type="text" id="inputname" className="form-control" placeholder="Name" />
                    <input  value={this.state.email} onChange={this.onChange} name="email" type="email"  className="form-control" placeholder="Email address" />
                    <input  value={this.state.password} onChange={this.onChange} name="password" type="password"  className="form-control" placeholder="Password" />
                    <button onClick={this.Register} className="btn btn-md btn-success btn-block" type="submit">Reigester</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Register;