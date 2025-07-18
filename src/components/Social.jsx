import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { IconButton, Box } from '@mui/material';

function Social() {
  return (
    <Box className="social" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
      <IconButton
        component="a"
        href="https://github.com/rjlardy21"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        size="large"
        sx={{ mx: 1 }}
      >
        <FaGithub />
      </IconButton>
      <IconButton
        component="a"
        href="https://instagram.com/rlardy"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        size="large"
        sx={{ mx: 1 }}
      >
        <ImInstagram />
      </IconButton>
      <IconButton
        component="a"
        href="https://linkedin.com/in/reecelardy/"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        size="large"
        sx={{ mx: 1 }}
      >
        <FaLinkedin />
      </IconButton>
    </Box>
  );
}

export default Social;
