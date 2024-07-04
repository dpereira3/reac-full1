import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reUserState } from '../../Store/Actions';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = { 
            email:'',
            password: '',
            errors: ''
        };
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value })}

    Login = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        const Data = { 
            email:this.state.email, 
            password:this.state.password 
        };

        console.log('Datos:', Data)
        console.log(this.props.URL_backend)
        axios.post(`${this.props.URL_backend}/Login`, { Data }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log('Datos:', Data)
            
            console.log(res)
            /* if(res['Data']){
                //Succefully operation
                localStorage.setItem('token', res.data.token);
                this.props.reUserState(true);
                this.props.props.history.push('/Profile');
            }
            if(!res){
                // failed
                const err = res.data;
                this.setState({ errors:err })
            } */
        })
        .catch(err => console.log(err));
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
                <form className="form-signin">
                    <h4 className="h3 mb-3 font-weight-normal grey">Please sign in</h4>
                    <input value={this.state.email} onChange={this.onChange} name="email" type="email"  className="form-control" placeholder="Email address" />
                    <input value={this.state.password} onChange={this.onChange} name="password" type="password"  className="form-control" placeholder="Password" />
                    <button onClick={this.Login} className="btn btn-md btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    reUserState:PropTypes.func.isRequired,
    Users:PropTypes.object.isRequired
}

const mapToProps = (state) => ({
    Users:state.Users
})

export default connect (mapToProps, {reUserState})(Login);