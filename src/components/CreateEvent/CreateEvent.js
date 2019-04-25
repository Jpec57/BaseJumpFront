import React, {Component} from 'react';
import './CreateEvent.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {postEvent} from "../../services/eventService";
import {withRouter} from "react-router-dom";

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessageInfo: "",
            errorMessageDate: "",
            errorMessageGuest: "",
            isAnswerVisible: false,
            enablesMultipleVotes: false,
            date: "",
            guest: "",
            event: {
                title: "",
                location: "",
                description: "",
                deadline: "",
                dates: [],
                guests: []
            }
        };
    }

    handleChangeInEvent(event) {
        const ev = this.state.event;
        ev[event.target.name]= event.target.value;
        this.setState({
            event: ev,
            errorMessageInfo: ""
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    addDate() {
        const event = this.state.event;
        const dates = event.dates;
        const date = this.state.date;
        if (date !== "") {
            if (!dates.includes(date)) {
                if (dates.length >= 10) {
                    this.setState({
                        errorMessageDate: "Le nombre maximum de dates est atteint"
                    });
                } else {
                    dates.push(date);
                    this.setState({
                        errorMessageDate: "",
                        event: event
                    });
                }
            } else {
                this.setState({
                    errorMessageDate: "La date est déjà proposée",
                });
            }
        } else {
            this.setState({
                errorMessageDate: "La date n'est pas valide",
            });
        }
    }

    addGuest() {
        const event = this.state.event;
        const guests = event.guests;
        const guest = this.state.guest;
        if (guest !== "") {
            if (!guests.includes(guest)) {
                guests.push(guest);
                this.setState({
                    errorMessageGuest: "",
                    event: event
                });
            } else {
                this.setState({
                    errorMessageGuest: "Cette personne est déjà invitée",
                });
            }
        } else {
            this.setState({
                errorMessageGuest: "Le nom n'est pas valide",
            });
        }
    }

    deleteDate(index) {
        const event = this.state.event;
        const dates = event.dates;
        dates.splice(index, 1);
        this.setState({
            event: event
        })
    }

    deleteGuest(index) {
        const event = this.state.event;
        const guests = event.guests;
        guests.splice(index, 1);
        this.setState({
            event: event
        })
    }

    createEvent() {
        const event = this.state.event;
        if (event.title === "") {
            this.setState({
                errorMessageInfo: "L'événement doit avoir un titre"
            });
        } else {
            if (event.dates.length < 1) {
                this.setState({
                    errorMessageDate: "Proposez au moins une date"
                });
            } else if (event.guests.length < 1) {
                this.setState({
                    errorMessageGuest: "Ajoutez au moins un invité"
                });
            } else {
                postEvent(event).then((event)=>{
                    this.props.history.push('/events/' + event.id);
                }, (error)=>{
                    this.setState({
                        errorMessageInfo: "Une erreur " + error + " est survenue lors de l'envoi de l'événement"
                    });
                });
            }
        }
    }

    render() {
        const DATE_OPTIONS = {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'};
        return (
            <div className="centered font">
                <Card className="cardContainer">
                    <Card.Header>
                        <Card.Title>Informations</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <form className="column space">
                            <div className="column">
                                                                <span className="error">
                                    {this.state.errorMessageInfo}
                                </span>
                                <label>Titre</label>
                                <input type="text"
                                       name="title"
                                       placeholder="Saisissez le titre"
                                       value={this.state.event.title}
                                       required={true}
                                       onChange={(event) => this.handleChangeInEvent(event)}/>
                            </div>
                            <div className="column">
                                <label>Lieu (facultatif)</label>
                                <input type="text"
                                       name="location"
                                       placeholder="Saisissez le lieu"
                                       value={this.state.event.location}
                                       onChange={(event) => this.handleChangeInEvent(event)}/>
                            </div>
                            <div className="column">
                                <label>Description (facultatif)</label>
                                <textarea
                                    placeholder="Entrez une description"
                                    name="description"
                                    value={this.state.event.description}
                                    onChange={(event) => this.handleChangeInEvent(event)}/>
                            </div>
                            <div className="column">
                                <label>Deadline (facultatif)</label>
                                <input
                                    type="date" name="deadline"
                                    value={this.state.event.deadline}
                                    onChange={(event) => this.handleChangeInEvent(event)}/>
                            </div>
                            <div className="row">

                            </div>
                            <div className="row">
                                <input
                                    type="checkbox" name="isAnswerVisible"
                                    value={this.state.event.isAnswerVisible}
                                    onChange={(event) => this.handleChangeInEvent(event)}/>
                                <label>Réponses visibles par tous</label>

                                <input
                                    type="checkbox" name="enablesMultipleAnswers"
                                    value={this.state.event.enablesMultipleVotes}
                                    onChange={(event) => this.handleChangeInEvent(event)}/>
                                <label>Plusieurs réponses possibles</label>

                            </div>
                        </form>
                        <div className="row">
                            <div className="add">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Ajouter une date</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="column">
                                <span className="error">
                                    {this.state.errorMessageDate}
                                </span>
                                        <label>Entrez une date</label>
                                        <input type="date" name="date" value={this.state.date} onChange={(event) => {
                                            this.handleChange(event)
                                        }}/>
                                        <Button onClick={() => {
                                            this.addDate()
                                        }}>Ajouter</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div>
                                <ul>
                                    {this.state.event.dates.map((date, index) => {
                                        return (
                                            <li key={index} onClick={() => {
                                                this.deleteDate(index)
                                            }}>{(new Date(date)).toLocaleDateString('fr-FR', DATE_OPTIONS)
                                            }</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="add">
                                <Card className="font">
                                    <Card.Header>
                                        <Card.Title>Ajouter un invité</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="column">
                                <span className="error">
                                    {this.state.errorMessageGuest}
                                </span>
                                        <label>Entrez un nom</label>
                                        <input className="font" type="text" name="guest" value={this.state.guest}
                                               onChange={(event) => {
                                            this.handleChange(event)
                                        }}/>
                                        <Button onClick={() => {
                                            this.addGuest()
                                        }}>Ajouter</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="column">
                                <ul>
                                    {this.state.event.guests.map((guest, index) => {
                                        return (
                                            <li key={index} onClick={() => {
                                                this.deleteGuest(index)
                                            }}>
                                                {guest}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>


                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => {
                            this.createEvent()
                        }}>Créer l'événement</Button>
                    </Card.Footer>
                </Card>




            </div>
        );
    }
}

export default withRouter(CreateEvent);