import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './contents/Home.jsx';
import About from './contents/About';
import Education from './contents/Education';
import Contact from './contents/Contact';
import Experience from './contents/Experience';
import Resume from './contents/Resume';
import { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#18181b',
      paper: '#232329',
    },
    primary: {
      main: '#fff',
      contrastText: '#18181b',
    },
    secondary: {
      main: '#00e0d3',
    },
    text: {
      primary: '#fff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.05em',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(35,35,41,0.95)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          padding: '2rem',
        },
      },
    },
  },
});

function App() {
  const [sheetData, setSheetData] = useState({ sections: [], contact: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Sections tab
    const fetchSections = fetch(
      'https://docs.google.com/spreadsheets/d/1cfbNbcYkw_frbhe-Jgq8OJLi9DKR0YOvxz4XvBs3Qtw/gviz/tq?tqx=out:json&sheet=Sections'
    )
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substring(47, text.length - 2));
        const cols = json.table.cols.map(col => col.label);
        return json.table.rows.map(row =>
          row.c.reduce((acc, cell, i) => {
            acc[cols[i]] = cell ? cell.v : '';
            return acc;
          }, {})
        );
      });
    // Fetch Contact tab
    const fetchContact = fetch(
      'https://docs.google.com/spreadsheets/d/1cfbNbcYkw_frbhe-Jgq8OJLi9DKR0YOvxz4XvBs3Qtw/gviz/tq?tqx=out:json&sheet=Contact'
    )
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substring(47, text.length - 2));
        const rows = json.table.rows;
        // Use first row as keys, second row as values
        const keys = rows[0].c.map(cell => (cell && cell.v ? cell.v : ''));
        const values = rows[1].c.map(cell => (cell && cell.v ? cell.v : ''));
        const contactObj = {};
        keys.forEach((key, i) => {
          if (key) contactObj[key] = values[i] || '';
        });
        return contactObj;
      });
    Promise.all([fetchSections, fetchContact])
      .then(([sections, contact]) => {
        setSheetData({ sections, contact });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <CircularProgress />
      </Box>
    </ThemeProvider>
  );
  if (!sheetData.sections.length && !sheetData.contact.length) return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <Typography color="error">Error loading data.</Typography>
      </Box>
    </ThemeProvider>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Global Video Background */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            filter: 'brightness(0.5)'
          }}
        >
          <source src={process.env.PUBLIC_URL + '/bg.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      {/* Main Content Overlay */}
      <Box minHeight="100vh" sx={{ position: 'relative', zIndex: 1, bgcolor: 'transparent' }}>
        <Router>
          <Navbar />
          <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Routes>
              <Route exact path="/" element={<Home data={sheetData.sections} />} />
              <Route path="/about" element={<About data={sheetData.contact} />} />
              <Route path="/education" element={<Education data={sheetData.sections} />} />
              <Route path="/experience" element={<Experience data={sheetData.sections} />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact data={sheetData.contact} />} />
            </Routes>
          </Container>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
