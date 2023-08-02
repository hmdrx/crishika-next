// import { createTheme, ThemeProvider } from '@mui/material';
import Background from '../components/Background';
import Hero from '../components/Hero';
import FreeForever from '../components/FreeForever';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import WhyChoose from '../components/WhyChoose';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Background />
      <Hero />
      <FreeForever />
      <Features />
      <Benefits />
      <WhyChoose />
      <Contact />
    </>
  );
}
