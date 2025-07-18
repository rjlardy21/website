import React from 'react';
import Widecard from '../components/Widecard';
import { Box, Typography } from '@mui/material';

function Education({ data }) {
  // Filter for education rows (assuming Section or type column)
  const educationRows = data
    ? data.filter(row =>
        (row.Section && row.Section.toLowerCase() === 'education') ||
        (row.type && row.type.toLowerCase() === 'education')
      )
    : [];

  return (
    <Box sx={{ borderRadius: 3, p: { xs: 2, md: 6 }, boxShadow: 2, mt: 4, bgcolor: 'transparent' }}>
      <Typography variant="h3" className="subtopic" gutterBottom>My Education</Typography>
      {educationRows.length === 0 && <Typography>No education data found.</Typography>}
      {educationRows.map((edu, idx) => (
        <Box key={idx} sx={{ mb: 3 }}>
          <Widecard
            title={edu.Title || edu.title}
            where={edu['School/Org'] || edu.where}
            from={edu['Start Date'] || edu.from}
            to={edu['End Date'] || edu.to}
            description={edu.Description || edu.description}
          />
        </Box>
      ))}
    </Box>
  );
}

export default Education;
