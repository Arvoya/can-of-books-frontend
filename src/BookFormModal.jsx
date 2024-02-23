import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Import Axios

function BookFormModal() {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: '',
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async () => {
		try {
			await axios.post('http://localhost:3001/books', formData);
			handleClose();
		} catch (error) {
			console.error('There was an error submitting the form:', error);
		}
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Add Book
			</Button>

			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add A Book</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Book Title:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter book title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Description:</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Book description"
								name="description"
								value={formData.description}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Status:</Form.Label>
							<div>
								<Form.Check
									type="radio"
									label="Currently Reading"
									name="status"
									id="currentlyReading"
									value="Currently Reading"
									checked={formData.status === "Currently Reading"}
									onChange={handleChange}
									required
								/>
								<Form.Check
									type="radio"
									label="Completed"
									name="status"
									id="completed"
									value="Completed"
									checked={formData.status === "Completed"}
									onChange={handleChange}
								/>
								<Form.Check
									type="radio"
									label="Plan to Read"
									name="status"
									id="planToRead"
									value="Plan to Read"
									checked={formData.status === "Plan to Read"}
									onChange={handleChange}
								/>
							</div>
						</Form.Group>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default BookFormModal;
