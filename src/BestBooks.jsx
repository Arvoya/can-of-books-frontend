import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from "react-bootstrap/Button";
import UpdateBookFormModal from "./UpdateBookFormModal.jsx";

const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

class BestBooks extends React.Component {

     constructor() {
          super();
          this.state = {
               showUpdateModal: false,
               bookToUpdate: null
          }
     }

     componentDidMount() {
          this.connectToServer();
     }

     connectToServer = () => {
          axios.get(backendURL)
          .then(response => {
               this.props.updateBooks(response.data);
          })
          .catch(error => {
               console.error('There was an error connecting to the server:', error);
          });
     }

     onDelete = (book) => {
          const id = book.target.id;
          axios.delete(`${backendURL}/${id}`)
          .then(() => {
               const updatedBooks = this.props.books.filter(book => book._id !== id);
               this.props.updateBooks(updatedBooks);
          })
          .catch(error => {
               console.error('There was an error deleting the book:', error);
          });
     }

     onUpdate = (newBook) => {
          const id = newBook.target.id;

          axios.update(`${backendURL}/${id}`)
          .then(() => {
               this.connectToServer()
          }).catch(error => {
               console.error('There was an error updating the book:', error);
          });
     }

     handleUpdateClick = (book) => {
          this.setState({
               showUpdateModal: true,
               bookToUpdate: book
          })
     }

     handleUpdateModalClose = () => {
          this.setState({
               showUpdateModal: false,
               bookToUpdate: null
          })
     }

     render() {
          const { books } = this.props;

          return (
               <>
                    <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
                                             onClick={this.onDelete}>
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
                              updateBook={this.props.updateBook}
                         />
                    )}
               </>
          )
     }
}

export default BestBooks;