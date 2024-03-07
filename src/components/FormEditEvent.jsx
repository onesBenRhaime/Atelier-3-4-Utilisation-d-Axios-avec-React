import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { find, update } from "../services/EventService";

function FormEditEvent() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [eventDetails, setEventDetails] = useState({});

	useEffect(() => {
		const fetchEventData = async () => {
			try {
				const eventData = await find(id);
				setEventDetails(eventData.data);
				console.log("eventData", eventData.data);
			} catch (error) {
				console.error("Error fetching event details:", error);
			}
		};

		fetchEventData();
	}, [id]);

	const formik = useFormik({
		initialValues: {
			name: eventDetails?.name || "",
			description: eventDetails?.description || "",
			price: eventDetails?.price || 0,
			nbTickets: eventDetails?.nbTickets || 0,
			img: eventDetails?.img || "",
			nbParticipants: eventDetails?.nbParticipants || 0,
			like: eventDetails?.like || false,
		},
		onSubmit: async (values) => {
			try {
				await update(id, values);
				navigate("/events");
			} catch (error) {
				console.error("Error updating event:", error);
			}
		},
	});

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					name="name"
					value={formik.values.name}
					onChange={formik.handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					type="text"
					name="description"
					value={formik.values.description}
					onChange={formik.handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Price</Form.Label>
				<Form.Control
					type="number"
					name="price"
					value={formik.values.price}
					onChange={formik.handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Number of Tickets</Form.Label>
				<Form.Control
					type="number"
					name="nbTickets"
					value={formik.values.nbTickets}
					onChange={formik.handleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Image</Form.Label>
				<Form.Control
					type="text"
					name="img"
					value={formik.values.img}
					onChange={formik.handleChange}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default FormEditEvent;
