import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

function SummaryCard({ title, company, from, to, location, summary }) {
  return (
    <Card variant="outlined" sx={{ bgcolor: 'InfoText' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <WorkIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          {company} | {from} - {to} | {location}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;