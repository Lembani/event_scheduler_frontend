import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/api/events/')
          .then(response => setEvents(response.data))
          .catch(error => console.error("There was an error fetching the events!", error));
  }, []);

  const addEvent = (newEvent) => {
      setEvents([...events, newEvent]);
  };

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8}>
                    <h1 className="text-center my-4">Event Scheduler</h1>
                    <EventList events={events} />
                </Col>
                <Col xs={12} md={4} className="my-4">
                  <EventForm onAddEvent={addEvent} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
