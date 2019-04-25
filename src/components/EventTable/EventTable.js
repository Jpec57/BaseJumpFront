import React, {Component} from 'react';
import './EventTable.css';
import {getEvents} from "../../services/eventService";
import {withRouter} from 'react-router-dom';
import endSession from "../../services/authService";

class EventTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            dateOptions: {year: 'numeric', month: 'numeric', day: 'numeric'}

    };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.location.query === undefined){
            nextProps.location.query = {
                upcoming: true,
                type: "perso"
            };
        }
        this.loadEvents(nextProps.location.query.type, nextProps.location.query.upcoming);
    }

    componentWillMount() {
        if (this.props.location.query === undefined){
            this.props.location.query = {
                upcoming: true,
                type: "perso"
            };
        }
        this.loadEvents(this.props.location.query.type, this.props.location.query.upcoming);
    }

    loadEvents(type, upcoming){
        try{
            getEvents(type, upcoming).then((events)=>{
                this.setState({
                    events: events
                });
            });

        }catch(error){
            if (error === 401){
                endSession();
                this.props.history.push('/');
            }
        }
    }

    renderTableRow(event, index){
        let deadline = null;
        if (!event.deadline) {
            deadline = (new Date(event.deadline * 1000)).toLocaleDateString('fr-FR', this.state.dateOptions);
        }
        return (
            <tr key={index}>
                <td className="col-2">{deadline}</td>
                <td className="col-8">
                    {event.title}
                    <br/>
                    <span>{event.description}</span>
                </td>
                <td className="col-2">{event.location}</td>
            </tr>
        );
    }



    render() {

        return (<div className="align-self-center">
                { this.state.events.length ? null : <div><span>Il n'y a aucun événement disponible</span></div>}
                <table className="table table-striped table-bordered">
                    <tbody>
                    {
                        this.state.events.map((event, index) => this.renderTableRow(event, index))
                    }
                    </tbody>

                </table>

            </div>
        );
    }
}

export default withRouter(EventTable);
