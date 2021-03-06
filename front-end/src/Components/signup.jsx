import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment,Icon} from 'semantic-ui-react'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {Carousel} from "antd";
import Magazine from "../images/magazine.jpg";
import Music from "../images/music.jpg";
import Movie from "../images/movie.png";
import Book from "../images/book.jpg";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { notification } from 'antd';
import {Redirect} from "react-router";
import axios from 'axios'
import ApiCalls from '../class/apiCalls'


let apicall = new ApiCalls;
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            phone:'',
            address:'',
            email:'',
            password: '',
            errorFirstName:false,
            errorLastName:false,
            errorPhone:false,
            errorAddress:false,
            errorEmail:false,
            errorPassword:false,
            loading:false,
        }
    }
    login=()=> this.props.history.push(`/login`);
    changeFirstName=(e)=>{
        this.setState({firstName:e.target.value})
        this.setState({errorFirstName: false})

    }
    changeLastName=(e)=>{
        this.setState({lastName:e.target.value})
        this.setState({errorLastName: false})
    }
    changePhone=(e)=>{
        this.setState({phone:e.target.value})
        this.setState({errorPhone: false})
    }
    changeAddress=(e)=>{
        this.setState({address:e.target.value})
        this.setState({errorAddress: false})
    }
    changeEmail=(e)=>{
        this.setState({email:e.target.value})
        this.setState({errorEmail: false})
    }
    changePassword=(e)=>{
        this.setState({password:e.target.value})
        this.setState({errorPassword: false})
    }
    signUp=()=>{
        let {firstName,lastName,phone,address, email, password } = this.state;
        if(!firstName || !lastName || !phone || !address || !email || !password){
            if(!firstName){
                this.setState({errorFirstName: true})
            }
            if(!lastName){
                this.setState({errorLastName: true})
            }
            if(!phone){
                this.setState({errorPhone: true})
            }
            if(!address){
                this.setState({errorAddress: true})
            }
            if(!email){
                this.setState({errorEmail: true})
            }
            if(!password){
                this.setState({errorPassword: true})
            }
            this.signupError();
        }else{
            this.setState({loading:true})
            let data={
                userId: 9999,
                data:{
                    FirstName: firstName,
                    LastName: lastName,
                    phone: phone,
                    Address: address,
                    email: email,
                    password: password,
                    type: 0
                }
            }
            let temp = this.props;
            let temp2 = this;
            console.log(data)
            apicall.addUser(data,function(data){
                apicall.commitSignup(function(data){
                    temp2.setState({loading:false})
                    if(data.creation[0].success === 'true'){
                        temp2.signupConfirmation();
                        temp.history.push(`/login`)
                    }else {
                        temp2.messageError(data.creation[0].message)
                    }

                })
            });

        }
    }
    signupConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Your account has been created!',
            duration:6,
        });
    };
    signupError = () => {
        notification.error({
            message: 'Error',
            description: 'You information is Missing!',
            duration:6,
        });
    };
    messageError = (data) => {
        notification.error({
            message: 'Error',
            description: data,
            duration:6,
        });
    };
    render() {
        if(this.props.userProfile) {
            return (<Redirect to={'/dashboard'}/>);
        }else {
            return (<div className='main-container'>
                <HeaderComponent/>
                <div className='MainContainer-ant-carousel'>
                    <div className='signup-form'>
                        <Grid textAlign='center' style={{height: '100%'}}>
                            <Grid.Column style={{maxWidth: 450, opacity: 0.9}}>
                                <Form size='large' loading={this.state.loading}>
                                    <Segment stacked>
                                        <Header as='h2' className='login-Header' textAlign='center'>Create an account
                                        </Header>
                                        <Form.Group width='equal'>
                                            <Form.Input
                                                icon='user'
                                                iconPosition='left'
                                                placeholder='John'
                                                label='First Name:'
                                                value={this.state.firstName}
                                                error={this.state.errorFirstName}
                                                onChange={this.changeFirstName}
                                                width={8}/>
                                            <Form.Input
                                                icon='user'
                                                iconPosition='left'
                                                placeholder='Dylon'
                                                label='Last Name:'
                                                value={this.state.lastName}
                                                error={this.state.errorLastName}
                                                onChange={this.changeLastName}
                                                width={8}/>
                                        </Form.Group>
                                        <Form.Input
                                            fluid icon='phone'
                                            iconPosition='left'
                                            placeholder='Ex:514 888 111 32'
                                            type='number'
                                            value={this.state.phone}
                                            error={this.state.errorPhone}
                                            onChange={this.changePhone}
                                            label='Phone:'/>
                                        <Form.Input
                                            fluid icon='address book'
                                            iconPosition='left'
                                            placeholder='Ex: 1445 Rue Guy Montreal QC, Canada'
                                            value={this.state.address}
                                            error={this.state.errorAddress}
                                            onChange={this.changeAddress}
                                            label='Address:'/>
                                        <Form.Input
                                            fluid icon='mail'
                                            iconPosition='left'
                                            placeholder='john@concordia.ca'
                                            value={this.state.email}
                                            error={this.state.errorEmail}
                                            onChange={this.changeEmail}
                                            label='Email:'/>
                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            label='Password'
                                            placeholder='Password'
                                            value={this.state.password}
                                            error={this.state.errorPassword}
                                            onChange={this.changePassword}
                                            type='password'
                                        />
                                        <Button className='login-button' fluid size='large' onClick={this.signUp}>
                                            Sign Up
                                        </Button>
                                    </Segment>
                                </Form>
                                <Message>
                                    You already have an account? <a onClick={this.login}>Login</a>
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </div>
                    <Carousel autoplay effect="fade">
                        <Image src={Magazine}/>
                        <Image src={Music}/>
                        <Image src={Movie}/>
                        <Image src={Book}/>
                    </Carousel>
                </div>
                <FooterComponent/>
            </div>)
        }
    }
}

function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(Signup));