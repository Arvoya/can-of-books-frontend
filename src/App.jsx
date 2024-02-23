import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About.jsx';
import BookFormModal from "./BookFormModal.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  state = {
    books: []
  };

  addBook = (book) => {
    this.setState(prevState => ({
      books: [...prevState.books, book]
    }));
  }

  updateBooks = (books) => {
    this.setState({ books });
  }

  render() {
    return (
         <>
           <Router>
             <Header />
             <Link to="/">
               <p>HOME</p>
             </Link>
             <Link to="/about">
               <p>ABOUT</p>
             </Link>
             <Routes>
               <Route
                    exact path="/"
                    element={
                      <>
                        <BookFormModal addBook={this.addBook}/>
                        <BestBooks books={this.state.books} updateBooks={this.updateBooks} />
                      </>
                    }
               >
               </Route>
               <Route
                    exact path="/about"
                    element={<About />}
               >
               </Route>
             </Routes>
             <Footer />
           </Router>
         </>
    )
  }
}

export default App;