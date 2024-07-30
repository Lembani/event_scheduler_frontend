import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const EventForm = ({ onAddEvent }) => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [timezone, setTimezone] = useState('');
    const [timezones, setTimezones] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/timezones/')
            .then(response => {
                setTimezones(response.data);
                setTimezone('Africa/Lusaka');
            })
            .catch(error => {
                console.error("There was an error fetching the timezones!", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/events/', {
            name,
            start_time: startTime,
            duration,
            timezone
        })
        .then(response => {
            onAddEvent(response.data);
            setStatusMessage('Event successfully added!');
            setError('');
            setName('');
            setStartTime('');
            setDuration('');
            setTimezone('Africa/Lusaka');
        })
        .catch(error => {
            console.error("There was an error creating the event!", error);
            setError('Failed to add event. Please try again.');
            setStatusMessage('');
        });
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Create Event</Card.Title>
                {statusMessage && <Alert variant="success">{statusMessage}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formStartTime">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDuration">
                        <Form.Label>Duration (in seconds)</Form.Label>
                        <Form.Control
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTimezone">
                        <Form.Label>Timezone</Form.Label>
                        <Form.Control
                            as="select"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            required
                        >
                            {timezones.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Event
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EventForm;
