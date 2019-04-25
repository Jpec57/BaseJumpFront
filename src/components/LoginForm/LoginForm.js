import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import './LoginForm.css';
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';
import {signIn} from '../../services/authService';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        };
    }

    login(){
        signIn(this.state.username, this.state.password)
            .then(()=>{
                this.props.history.push('/event');
            }, (error)=>{
                if (error === 400){
                    this.setState({
                        errorMessage: "Email ou mot de passe incorrect."
                    });
                }
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: ""
        });
    }

    render() {
        return (
            <div className="centeredDiv">
                <Card className="Card">
                    <Card.Header className="CardHeader">
                        <Card.Title>Se connecter</Card.Title>
                    </Card.Header>
                    <Card.Body>
                            <form>

                                <div className="login">
                                    <label><b>Email</b></label>
                                    <input type="email" value={this.state.username}
                                           onChange={(event) => this.handleChange(event)}
                                           placeholder="Entrez votre email" name="username" required/>
                                    <label><b>Mot de passe</b></label>
                                    <input type="password" value={this.state.password}
                                           onChange={(event) => this.handleChange(event)}
                                           placeholder="Entrez votre mot de passe" name="password" required/>
                                    <Button onClick={() => this.login()}>Se connecter</Button>
                                </div>

                            </form>
                    </Card.Body>
                    <Card.Footer className="centered">
                        <span className="footer">Pas encore inscrit ?</span>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default withRouter(LoginForm);