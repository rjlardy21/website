import React from 'react';
import { Link } from "react-router-dom";
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

function Navitem({ item, tolink, activec, active }) {
  return (
    <ListItem disablePadding id={item} sx={{ width: 'auto' }}>
      <ListItemButton
        component={Link}
        to={tolink}
        onClick={() => activec(item)}
        sx={{
          textAlign: 'center',
          borderRadius: 2,
          mx: 1,
          bgcolor: active ? 'primary.main' : 'transparent',
          color: active ? 'primary.contrastText' : 'text.primary',
          '&:hover': {
            bgcolor: active ? 'primary.dark' : 'action.hover',
          },
          transition: 'background 0.2s',
        }}
      >
        <ListItemText primary={item} sx={{ textAlign: 'center' }} />
      </ListItemButton>
    </ListItem>
  );
}

export default Navitem;
