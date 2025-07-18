import React from 'react';
import Social from '../components/Social';
import { Box, Typography, Link } from '@mui/material';

function Contact({ data }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: { xs: 2, md: 6 }, boxShadow: 2, mt: 4 }}>
      <Typography variant="h3" className="subtopic" gutterBottom>Contact Me</Typography>
      <Typography variant="h6" className="subtopic" gutterBottom>
        If you are interested in working with me or hiring me, here are ways to get in touch:
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>Phone: {data.Phone}</Typography>
      <Typography variant="body1">
        Email: <Link href={`mailto:${data.Email}`}>{data.Email}</Link>
      </Typography>
      <Typography variant="body1">
        Instagram: <Link href={`https://instagram.com/${data.Instagram || 'rlardy'}`} target="_blank" rel="noopener noreferrer">
          @{data.Instagram || 'rlardy'}
        </Link>
      </Typography>
      <Typography variant="body1">
        LinkedIn: <Link href={data.LinkedIn} target="_blank" rel="noopener noreferrer">
          {data.LinkedIn}
        </Link>
      </Typography>
      <Typography variant="body1">
        GitHub: <Link href={data.GitHub} target="_blank" rel="noopener noreferrer">
          {data.GitHub}
        </Link>
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Social />
      </Box>
    </Box>
  );
}

export default Contact;
