import React from 'react';
import resumePic from '../public/ReeceLardyResume.png';
import resumePDF from '../public/ReeceLardyResume.pdf';
import { Box, Typography, Button } from '@mui/material';

function Resume() {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: { xs: 2, md: 6 }, boxShadow: 2, mt: 4, textAlign: 'center' }}>
      <Typography variant="h3" className="subtopic" gutterBottom>My Resume</Typography>
      <Button
        variant="contained"
        color="primary"
        href={resumePDF}
        download
        sx={{ mb: 3 }}
      >
        Click to download
      </Button>
      <Box>
        <img src={resumePic} alt="Resume" style={{ borderRadius: '5%', width: '100%', maxWidth: 600, margin: '30px auto', display: 'block' }} />
      </Box>
    </Box>
  );
}

export default Resume;
