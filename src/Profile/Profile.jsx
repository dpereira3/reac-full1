import React, { Component } from 'react';
import axios from 'axios';
import { confirm as confirmComplex } from './Confirm';

const PORT = process.env.REACT_APP_PORT || 4000;
const URL_backend = `${process.env.REACT_APP_URL_BACKEND}/api/users` || `http://localhost:${PORT}/api/users`;

class Profile extends Component {

    mounted = false;

    constructor(props){
        super(props);
        this.state = { 
            id: '',
            name: '',
            adress: '',
            email: '',
            pic: '',
            isEdit: false,
            file: '',
            password: '',
            errors: ''
        };
    }

    componentWillUnmount() { this.mounted = false; }

    componentWillMount() {
        this.mounted = true;

        const token = localStorage.getItem('token');
        if( token ){
            axios.get(`${URL_backend}/GetUserData`, {
                headers:{
                    Authorization: token
                }
            }).then( (res) => {
                //console.log('res', res);
                //console.log('res data', res.data.result[0]);

                if(this.mounted){
                    const data = res.data.result[0];
                    var domain = data.email.replace(/.*@/, "").split('.')[0];
                    const UrlDomain = 'http://www.' + domain + '.com'; //gmail

                    this.setState({
                        id:data.id,
                        name:data.name,
                        adress:data.adress,
                        email:data.email,
                        pic:data.pic,
                        MailDomail: UrlDomain,
                    })
                }
            })
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    _handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = () => {
            this.setState({
                file: file,
                pic: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    Pic = () => {
        if(this.state.pic === 'undefined' ||
        this.state.pic === undefined ||
        this.state.pic === null ||
        this.state.pic === ''){
            return false
        } else {
            return true
        }
    }

    EditUserData = () => {
        console.log('edit');
        this.setState({
            isEdit: true
        })
    }

    SaveUserData = (e) => {
        console.log('save');
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            isEdit: false
        });
        console.log(this.state);

        const file = this.state.file;
        const postData = new FormData();
        postData.append("name", this.state.name);
        postData.append("adress", this.state.adress);
        postData.append("pic", this.state.pic);
        postData.append("image", file);

        console.log('ourdata', postData);

        axios.put(`${URL_backend}/edit/${this.state.id}`, postData)
        .then(res => {
            console.log(res);
        })
        .catch((err) => {console.log(err)})

    }

    //delete User
    handleOnClickRemove = () => {
        confirmComplex({ Password: "Enter your password to complete the operation"}).then(
            ({ input }) => {
                this.setState({
                    Password:input
                });
                this.RequestToRemove();
            },
            () => {
                this.setState({
                    Password: 'canceled!'
                });
            }
        );
    }

    RequestToRemove = () => {
        const Pass = this.state.Password;
        axios.delete(`${URL_backend}/delete/${this.state.id}/${Pass}`)
        .then(res => {
            console.log(res);
            console.log(res.data.message);
            this.props.Logout();
        })
        .catch((err) => {this.setWrongpassword(err)} )
    }

    setWrongpassword = (err) => {
        console.log(err);
        this.setState({errors:'incorrect password please try again'})
    }

    render() {
        return(
            <React.Fragment>
                <center>
                    { this.state.errors ? 
                    <i className='alert alert-danger' role='alert'>
                        {this.state.errors}
                    </i>: ''}
                    <hr></hr>
                    <section className="Specific">
                    <div className="main" id="main">
                        <div className="container">
                        <div className="row">
                        <div className="col-lg-12 col-md-12">

                            { this.state.isEdit ?
                            
                                // Edit User Data
                                <div className="SUsersData">
                                    <button className="edit btn btn-danger">
                                        <i className="fas fa-edit"></i>Edit
                                    </button>
                                    <h4><i className="bl">Your Profile Data</i></h4>
                                    { this.Pic() ? 
                                        <img src={this.state.pic} alt='' /> :
                                        <img src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt="" />    
                                    }
                                    <div className="clear"></div>
                                    <div>
                                        <label htmlFor="file-upload"
                                        className="custom-file-upload">Upload</label>
                                        <input id="file-upload"
                                        type="file"
                                        onChange={this._handleImageChange} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control m-2"
                                        placeholder="name"
                                        value={this.state.name ? this.state.name : ''}
                                        onChange={this.onChange}
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control m-2 bl"
                                        placeholder="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="adress"
                                        className="form-control m-2"
                                        placeholder="adress"
                                        value={this.state.adress ? this.state.adress : ''}
                                        onChange={this.onChange}
                                    />
                                    <button onClick={this.SaveUserData}
                                    className="edit btn btn-primary">
                                        <i className="fas fa-edit"></i>Save
                                    </button>
                                </div>
                            // end of Edit User Data
                            :
                            // Show User Data
                            <div className="SUsersData">
                            <button 
                            onClick={this.EditUserData }
                            className="edit btn btn-danger">
                            <i className="fas fa-edit"></i> Edit</button>
                            <h4><i className="bl">Your Profile Data</i></h4>
                            { this.Pic() ? 
                                <img src={this.state.pic} alt="" /> :
                                <img src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt="" />
                            }
                            <h4>Name  :<i className="bl"> 
                            { this.state.name ? this.state.name : '' } </i></h4>

                            <h4>Email  :<i className="bl">
                                {this.state.email}</i> </h4>

                            <h4>Adress  :<i className="bl">
                                {this.state.adress ? this.state.adress : '' } </i></h4>
                            </div>
                            // end of show user data
                        }

                        {/*  Remove user */}
                            <div className="REMOVEU">
                                <button
                                    className="btn btn-danger m-2"
                                    onClick={this.handleOnClickRemove}>Delete Your Account</button>
                            </div>
                        {/* end of Remove User */}
                        </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </center>

            </React.Fragment>
        )
    }
}

export default Profile