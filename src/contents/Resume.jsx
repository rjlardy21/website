import React, {Component} from 'react';
import resumePic from '../public/ReeceLardyResume.jpeg';
import resumePDF from '../public/ReeceLardyResume.pdf';

class Resume extends Component {

  render() {
    return (
      <div className="condiv">

        <h1 className="subtopic">My Resume</h1>
        <br/>
        <a className='subtopic' href={resumePDF} download>Click to download</a>
        <img src={resumePic} alt="Resume" className="resumePic"></img>
      </div>

    )
  }
}

export default Resume
