import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ResumeSheetProvider } from './context/ResumeSheetContext';
import Home from './contents/Home';
import About from './contents/About';
import Education from './contents/Education';
import Experience from './contents/Experience';
import Projects from './contents/Projects';
import Contact from './contents/Contact';
import Resume from './contents/Resume';
import PastaPassTracker from './contents/PastaPassTracker';
import ListeningTo from './contents/ListeningTo';

function App() {
    return (
        <Router>
            <ResumeSheetProvider>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/education">
                            <Education />
                        </Route>
                        <Route path="/experience">
                            <Experience />
                        </Route>
                        <Route path="/projects">
                            <Projects />
                        </Route>
                        <Route path="/resume">
                            <Resume />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/pasta-pass-tracker">
                            <PastaPassTracker />
                        </Route>
                        <Route path="/listening-to">
                            <ListeningTo />
                        </Route>
                    </Switch>
                </div>
            </ResumeSheetProvider>
        </Router>
    );
}

export default App;
