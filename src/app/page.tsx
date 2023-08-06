// import { createTheme, ThemeProvider } from '@mui/material';
import Background from '../components/Background';
import Hero from '../components/Hero';
import FreeForever from '../components/FreeForever';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import WhyChoose from '../components/WhyChoose';
import Contact from '../components/Contact';
import Script from 'next/script';

export default function Home() {
  return (
    <div>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QDZHVVJQG7"
      />

      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QDZHVVJQG7');`}
      </Script>
      <Background />
      <Hero />
      <FreeForever />
      <Features />
      <Benefits />
      <WhyChoose />
      <Contact />
    </div>
  );
}
