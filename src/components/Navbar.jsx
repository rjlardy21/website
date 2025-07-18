import React, { useState } from 'react';
import Navitem from './Navitem';
import { AppBar, Toolbar, List, Box } from '@mui/material';

const navItems = [
  { item: "Home", tolink: "/" },
  { item: "About", tolink: "/about" },
  { item: "Education", tolink: "/education" },
  { item: "Experience", tolink: "/experience" },
  { item: "Resume", tolink: "/resume" },
  { item: "Contact", tolink: "/contact" },
];

function Navbar() {
  const [navItemActive, setNavItemActive] = useState("Home");

  const handleActiveItem = (item) => {
    setNavItemActive(item);
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: 2 }}>
      <Toolbar>
        <Box sx={{ width: '100%' }}>
          <List sx={{ display: 'flex', flexDirection: 'row', p: 0, m: 0 }}>
            {navItems.map(({ item, tolink }) => (
              <Navitem
                key={item}
                item={item}
                tolink={tolink}
                activec={handleActiveItem}
                active={navItemActive === item}
              />
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
