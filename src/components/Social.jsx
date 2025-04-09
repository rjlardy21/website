import React, {Component} from 'react';
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {ImInstagram} from "react-icons/im";

class Social extends Component {
  render() {
    return (
      <div className="social">
        <a href="https://github.com/rjlardy21" target="_blank" rel="noopener noreferrer"><FaGithub/></a>
        <a href="https://Instagram.com/rlardy" target="_blank" rel="noopener noreferrer"><ImInstagram/></a>
        <a href="https://Linkedin.com/in/reecelardy/" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
      </div>
    )
  }
}

export default Social
