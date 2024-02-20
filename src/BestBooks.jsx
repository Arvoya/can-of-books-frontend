import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }



componentDidMount() {
  axios.get(`https://can-of-books-backend-u3kg.onrender.com/books`)
  .then(response => {
    console.log(response.data)
    this.setState({
      books: response.data
    })
  })
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
