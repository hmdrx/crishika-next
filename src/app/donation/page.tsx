import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/colors';
import qr from '../../assets/images/donate-qrcode.png';
import Background from '../../components/Background';
import Image from 'next/image';
import Script from 'next/script';

const Donate = () => {
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
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4">
          Support Our Free Platform, Ignite a World of Learning
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Your donation helps sustain our free platform, providing quality
          resources to agricultural students across India. Together, we can
          ensure equal access to education and empower learners to reach their
          full potential. Join us in making a lasting impact on the future of
          education through your generous support.
        </Typography>
        <Stack alignItems="center">
          <Box sx={{ maxWidth: '24rem', mx: 'auto' }}>
            <Image
              style={{
                width: '100%',
                height: 'auto',
              }}
              src={qr}
              alt="phone pe qr code"
            />
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Donate;
