import React from 'react';
import { Box, Typography } from '@mui/material';


function About({ data }) {
  const about = data.About || "No about information available.";

    return (
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: { xs: 2, md: 6 }, boxShadow: 2, mt: 4 }}>
        <Typography variant="h3" className="subtopic" gutterBottom>About Me</Typography>
        <Typography variant="h5" gutterBottom>Hey there,</Typography>
        <Typography variant="h4" fontWeight={700} gutterBottom>I'm Reece Lardy</Typography>
        <Typography variant="h6" gutterBottom>
          Software <u>Developer</u> | Computer <u>Engineer</u>
        </Typography>
        <Typography variant="body1" sx={{ mt: 3 }}>{about}</Typography>
      </Box>
    );
  }

export default About;
