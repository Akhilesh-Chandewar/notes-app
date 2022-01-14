import React from 'react';
import { About } from './components/About';
import { Home } from './components/Home';
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Navbar } from './components/Navbar';
// import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
      {/* <NoteState> */}
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* </NoteState> */}
    </>

  );
}

export default App;
