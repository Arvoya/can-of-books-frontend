import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

class UpdateBookFormModal extends React.Component {
	state = {
		book: this.props.book
	};

	componentDidUpdate(prevProps) {
		if (this.props.book !== prevProps.book) {
			this.setState({ book: this.props.book });
		}
	}

	handleInputChange = (event) => {
		this.setState({
			book: {
				...this.state.book,
				[event.target.name]: event.target.value
			}
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		axios.put(`${backendURL}/${this.state.book._id}`, this.state.book)
		.then(() => {
			this.props.updateBook(this.state.book);
			this.props.onHide();
		})
		.catch(error => {
			console.error('There was an error updating the book:', error);
		});
	};

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Update Book</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="formBookName">
							<Form.Label>Book Name</Form.Label>
							<Form.Control type="text" name="title" value={this.state.book.title} onChange={this.handleInputChange} />
						</Form.Group>
						<Form.Group controlId="formBookDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" name="description" value={this.state.book.description} onChange={this.handleInputChange} />
						</Form.Group>
						<Form.Group controlId="formBookStatus">
							<Form.Label>Status</Form.Label>
							<div>
								<Form.Check
									type="radio"
									label="Currently Reading"
									name="status"
									id="currentlyReading"
									value="Currently Reading"
									checked={this.state.book.status === "Currently Reading"}
									onChange={this.handleInputChange}
								/>
								<Form.Check
									type="radio"
									label="Completed"
									name="status"
									id="completed"
									value="Completed"
									checked={this.state.book.status === "Completed"}
									onChange={this.handleInputChange}
								/>
								<Form.Check
									type="radio"
									label="Plan to Read"
									name="status"
									id="planToRead"
									value="Plan to Read"
									checked={this.state.book.status === "Plan to Read"}
									onChange={this.handleInputChange}
								/>
							</div>
						</Form.Group>
						<Button variant="secondary" type="submit">
							Update
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default UpdateBookFormModal;