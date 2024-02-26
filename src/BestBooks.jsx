// BestBooks.jsx
import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import UpdateBookFormModal from "./UpdateBookFormModal.jsx";
import BookFormModal from "./BookFormModal.jsx";

const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

class BestBooks extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               books: [],
               showUpdateModal: false,
               showAddModal: false,
               bookToUpdate: null,
               isLoading: false,
               showToast: false
          };
     }

     componentDidMount() {
          this.connectToServer();
     }

     connectToServer = () => {
          axios.get(backendURL)
          .then(response => {
               this.setState({ books: response.data });
          })
          .catch(error => {
               console.error('There was an error connecting to the server:', error);
          });
     }

     addBook = (newBook) => {
          axios.post(`${backendURL}`, newBook)
          .then(() => {
               this.connectToServer()
          }).catch(error => {
               console.error('There was an error adding the book:', error);
          });
     }

     onDelete = (book) => {
          const id = book._id;
          axios.delete(`${backendURL}/${id}`)
          .then(() => {
               const updatedBooks = this.state.books.filter(book => book._id !== id);
               this.setState({ books: updatedBooks });
          })
          .catch(error => {
               console.error('There was an error deleting the book:', error);
          });
     }

     onUpdate = (updatedBook) => {
          const id = updatedBook._id;

          this.setState({ isLoading: true });

          axios.put(`${backendURL}/${id}`, updatedBook)
          .then(() => {
               this.connectToServer();
               this.setState({ showToast: true });
          })
          .catch(error => {
               console.error('There was an error updating the book:', error);
          })
          .finally(() => {
               this.setState({ isLoading: false });
          });
     };

     handleAddModalOpen = () => {
          this.setState({ showAddModal: true});
     }

     handleAddModalClose = () => {
          this.setState({ showAddModal: false});
     }


     handleUpdateSubmit = (book) => {
          this.onUpdate(book);
          this.setState({ showUpdateModal: false, bookToUpdate: null }, this.connectToServer);
     };

     handleUpdateClick = (book) => {
          this.setState({
               showUpdateModal: true,
               bookToUpdate: book
          });
     };

     handleUpdateModalClose = () => {
          this.setState({
               showUpdateModal: false,
               bookToUpdate: null
          })
     }

     render() {
          const { books, isLoading, showToast } = this.state;

          if (isLoading){
               return<p>Loading...</p>
          }
          return (
               <>
                    <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

                    <Button variant='primary' onClick={this.handleAddModalOpen}>
                         Add Book
                    </Button>

                    {books.length > 0 ? (
                         <Carousel>
                              {books.map((element, id) => (
                                   <Carousel.Item key={id} interval={5000}>
                                        <h3>{element.title}</h3>
                                        <p>{element.description}</p>
                                        <p>Status: {element.status}</p>
                                        <Button
                                             id={element._id}
                                             size='sm'
                                             style={{
                                                  display: 'block',
                                                  margin: '40px auto',
                                                  width: 'fit-content'
                                             }}
                                             onClick={() => this.onDelete(element)}>
                                             Delete Me
                                        </Button>
                                        <Button
                                             variant='secondary'
                                             id={element._id}
                                             size='sm'
                                             style={{
                                                  display: 'block',
                                                  margin: '40px auto',
                                                  width: 'fit-content'
                                             }}
                                             onClick={() => this.handleUpdateClick(element)}>
                                             Update Me
                                        </Button>

                                   </Carousel.Item>
                              ))}
                         </Carousel>
                    ) : (
                         <h3>No Books Found :(</h3>
                    )}
                    {this.state.bookToUpdate && (
                         <UpdateBookFormModal
                              show={this.state.showUpdateModal}
                              onHide={this.handleUpdateModalClose}
                              book={this.state.bookToUpdate}
                              updateBook={this.handleUpdateSubmit}
                         />
                    )}
                    <BookFormModal
                         show={this.state.showAddModal}
                         onHide={this.handleAddModalClose}
                         addBook={this.addBook}
                    />

                    <Toast onClose={() => this.setState({ showToast: false })} show={showToast} delay={3000} autohide>
                         <Toast.Header>
                              <strong className="mr-auto">Book Update</strong>
                         </Toast.Header>
                         <Toast.Body>Book updated successfully!</Toast.Body>
                    </Toast>
               </>
          )
     }
}

export default BestBooks;