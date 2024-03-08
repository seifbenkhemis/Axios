import { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom"
import { deleteEvent } from "../services/eventServices";

function Event(props) {
	const navigate = useNavigate();

    const [event, setEvent] = useState(props.event)
    const src = event.nbTickets === 0 ? " images/sold_out.png" : `images/${event.img}`;
    const msg = event.like ? "Dislike" : "Like";

    const handleLike = useCallback(() => {
        setEvent({ ...event,like: !event.like})
    },[event.like]);

    const handleDeleteEvent = async (event) => {
		try {
			await deleteEvent(event.id);
			navigate("/events");

			console.log("Event deleted successfully");
			window.location.reload();
		} catch (error) {
			console.error("Error deleting event:", error);
		}
	};


    return (
        <Card>
            <Card.Img variant="top" src={src} height={250}/>
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                    Price : {event.price}
                </Card.Text>
                <Card.Text>
                    Number of tickets : {event.nbTickets}
                </Card.Text>
                <Card.Text>
                    Number of participants : {event.nbParticipants}
                </Card.Text>
                <Button variant="primary" onClick={handleLike}>{msg}</Button>
                <Button variant="primary" onClick={()=>props.Buy(event)} disabled={event.nbTickets == 0 ? true : false}>Book an event</Button>
                <Button onClick={() => handleDeleteEvent(event)} className="mx-2">
					Delete
				</Button>
                <Link to={`edit/${event.id}`} className=" btn btn-primary mx-2">
					Edit
				</Link>
            </Card.Body>
        </Card>
    )
}

export default Event;