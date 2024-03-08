import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { find, update } from "../services/eventServices";

function UpdateEvent() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [eventDetails, setEventDetails] = useState({});
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: 0,
		nbTickets: 0,
		img: "",
		nbParticipants: 0,
		like: false,
	});

	useEffect(() => {
		const fetchEventData = async () => {
			try {
				const eventData = await find(id);
				setEventDetails(eventData.data);
				setFormData({
					name: eventData.data.name || "",
					description: eventData.data.description || "",
					price: eventData.data.price || 0,
					nbTickets: eventData.data.nbTickets || 0,
					img: eventData.data.img || "",
					nbParticipants: eventData.data.nbParticipants || 0,
					like: eventData.data.like || false,
				});
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchEventData();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await update(id, formData);
			navigate("/events");
		} catch (error) {
			console.error("Error updating event:", error);
		}
	};

	if (loading) {
		return (
			<div className="position-relative" style={{ marginTop: "15rem" }}>
				<div className="position-absolute top-50 start-50 translate-middle">
					<div className="spinner-border  spinner-border-lg" role="status">
						<span className="visually-hidden">
							<div className="loading">Loading</div>
						</span>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Title
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="form-control"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						className="form-control"
						value={formData.description}
						onChange={handleChange}
					></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						Price
					</label>
					<input
						type="number"
						id="price"
						name="price"
						className="form-control"
						value={formData.price}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="nbTickets" className="form-label">
						Number of Tickets
					</label>
					<input
						type="number"
						id="nbTickets"
						name="nbTickets"
						className="form-control"
						value={formData.nbTickets}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="img" className="form-label">
						Image
					</label>
					<input
						type="text"
						id="img"
						name="img"
						className="form-control"
						value={formData.img}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">{/* Add other form fields similarly */}</div>
				<button variant="primary" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default UpdateEvent;
