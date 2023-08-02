import { Container, Typography, Grid, Box, Card, Divider } from '@mui/material';
import Image from 'next/image';
import readIcon from '../assets/images/read.png';
import practiceIcon from '../assets/images/practice.png';
import repeatIcon from '../assets/images/repeat.png';

const card = [
  {
    title: 'Read',
    desc: "Expand your intellectual prowess with our app's swipe reading feature that puts endlesss one-liner questions at your fingertips.",
  },
  {
    title: 'Practice',
    desc: 'Sharpen your skills and boost your confidence with our comprehensive test practice feature',
  },
  {
    title: 'Repeat',
    desc: 'Uncover the right path to success by revisiting misunderstood concepts',
  },
];

const cards = card.map(el => (
  <Grid item xs={12} md={4} sx={{ p: 2 }} key={el + Math.random()}>
    <Card
      sx={{
        p: 4,
        bgcolor: 'transparent',
        backdropFilter: 'blur(4rem)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {(el.title === 'Read' && (
        <Box sx={{ width: '12rem' }}>
          <Image
            src={readIcon}
            alt="read icon"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>
      )) ||
        (el.title === 'Practice' && (
          <Box sx={{ width: '12rem' }}>
            <Image
              src={practiceIcon}
              alt="practice icon"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
        )) || (
          <Box sx={{ width: '12rem' }}>
            <Image
              src={repeatIcon}
              alt="repeat icon"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
        )}
      <Typography sx={{ mb: 1 }} variant="h5">
        {el.title}
      </Typography>
      <Typography variant="body1">{el.desc}</Typography>
    </Card>
  </Grid>
));

const SectionTwo = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Divider sx={{ px: 4, mb: 4 }} component="div" role="presentation">
        <Typography variant="h4">Features</Typography>
      </Divider>
      <Box sx={{ textAlign: 'center' }}>
        <Grid container columnSpacing={2}>
          {cards}
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionTwo;
