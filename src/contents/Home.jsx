import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import profilepic from '../public/reece_photo.JPG';
import resumePDF from '../public/ReeceLardyResume.pdf';
import Social from '../components/Social';
import { Box, Typography, Avatar, Button } from '@mui/material';

function Home() {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Avatar src={profilepic} alt="ProfilePic" sx={{ width: 200, height: 200, mb: 3, borderRadius: '40%', boxShadow: 3 }} />
        <ReactTypingEffect
          text={["I am Reece Lardy", "I am a Computer Engineer"]}
          speed={100}
          eraseDelay={700}
          displayTextRenderer={(text, i) => (
            <Typography variant="h2" sx={{ mb: 3, color: '#fff', fontWeight: 700, textShadow: '0 2px 16px #000' }}>{text}</Typography>
          )}
        />
        <Button
          variant="contained"
          color="primary"
          href={resumePDF}
          download
          sx={{ mt: 4 }}
        >
          Download Resume
        </Button>
        <Box sx={{ mt: 2 }}>
          <Social />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
