import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from "react-bootstrap/Button";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }



componentDidMount() {
    this.connectToServer();
}


connectToServer = () => {
  // axios.get(`https://can-of-books-backend-u3kg.onrender.com/books`)
  axios.get('http://localhost:3001/books')
  .then(response => {
    this.setState({
      books: response.data
    })
  })
}

onDelete = (book) => {
    const id = book.target.id;
    axios.delete(`http://localhost:3001/books/${id}`)
    .then(() => {
      const updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({ books: updatedBooks });
    })
    .catch(error => {
      console.error('There was an error deleting the book:', error);
    });
}


  render() {


    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
             <Carousel>
               {this.state.books.map((element, id) => (
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
                    </Carousel.Item>
               ))}
             </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
