import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About.jsx';
import Welcome from './Welcome.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Profile from "./Profile.jsx";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
         <>
           <Router>
             <Header />
             <Routes>
               <Route
                    exact path="/"
                    element={isAuthenticated ?<BestBooks/> : <Welcome/>}
               >
               </Route>
               <Route
                    exact path="/about"
                    element={<About />}
               >
               </Route>
             {isAuthenticated &&
             <Route
                  exact path ='/profile'
                  element={<Profile/>}
             >

             </Route>
             }
             </Routes>
             <Footer />
           </Router>
         </>
    )
  }
}

export default withAuth0(App);