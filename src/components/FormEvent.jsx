import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { add, get } from "../services/EventService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FormEvent() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [eventDetails, setEventDetails] = useState({
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
				const eventData = await get(id);
				setEventDetails(eventData);
			} catch (error) {
				console.error("Error fetching event details:", error);
			}
		};

		fetchEventData();
	}, [id]);

	const f = useFormik({
		initialValues: {
			name: eventDetails.name || "",
			description: eventDetails.description || "",
			price: eventDetails.price || 0,
			nbTickets: eventDetails.nbTickets || 0,
			img: eventDetails.img || "",
			nbParticipants: eventDetails.nbParticipants || 0,
			like: eventDetails.like || false,
		},
		onSubmit: async (values) => {
			console.log(values);
			await add(values);
			navigate("/events");
		},
	});

	return (
		<>
			{eventDetails && (
				<Form onSubmit={f.handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={f.values.name}
							onChange={f.handleChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							type="text"
							name="description"
							value={f.values.description}
							onChange={f.handleChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="number"
							name="price"
							value={f.values.price}
							onChange={f.handleChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Number of Tickets</Form.Label>
						<Form.Control
							type="number"
							name="nbTickets"
							value={f.values.nbTickets}
							onChange={f.handleChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="text"
							name="img"
							value={f.values.img}
							onChange={f.handleChange}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			)}
		</>
	);
}

export default FormEvent;
