import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function Widecard({ title, where, from, to, description }) {
  return (
    <Card variant="outlined" sx={{ bgcolor: 'InfoText' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <SchoolIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          {where}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {from} - {to}
        </Typography>
        {description && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default Widecard;
