import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Card } from 'react-bootstrap';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the events!", error);
            });
    }, []);

    console.log('Events: ',events);

    return (
        <Card>
            <Card.Body>
                <Card.Title>Events</Card.Title>
                <ListGroup>
                    {events.map(event => (
                        <ListGroup.Item key={event.id}>
                          {event.formatted_event}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default EventList;
