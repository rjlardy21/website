import React from 'react';
import SummaryCard from '../components/Summarycard';
import { Box, Typography } from '@mui/material';

function Experience({ data }) {
  // Filter or map your data as needed. Here, we assume each row with a "type" of "experience"
  const experiences = data
    ? data.filter((row) => row.Section && row.Section.toLowerCase() === 'experience')
    : [];

  return (
    <Box sx={{ borderRadius: 3, p: { xs: 2, md: 6 }, boxShadow: 2, mt: 4, bgcolor: 'transparent' }}>
      <Typography variant="h3" className="subtopic" gutterBottom>
        My Experience
      </Typography>
      {experiences.length === 0 && <Typography>No experience data found.</Typography>}
      {experiences.map((exp, idx) => (
        <Box key={idx} sx={{ mb: 3 }}>
          <SummaryCard
            title={exp.Title}
            company={exp['Company/Org']}
            from={exp['Start Date']}
            to={exp['End Date']}
            location={exp['Location']}
            summary={exp.Description}
          />
        </Box>
      ))}
    </Box>
  );
}

export default Experience;