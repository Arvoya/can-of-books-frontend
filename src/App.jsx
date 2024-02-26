import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
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
                    element={<BestBooks />}
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