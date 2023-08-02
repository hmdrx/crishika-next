import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../constants/colors';
import { Shop } from '@mui/icons-material';

const SectionFour = () => {
  return (
    <Container sx={{ my: 8, mt: { md: 18 } }}>
      {/* <Divider sx={{ px: 2, mb: 4 }} component="div" role="presentation">
        <Typography variant="h4">Why are you waiting for?</Typography>
      </Divider> */}
      <Typography align="center" variant="h4" sx={{ mb: 4 }}>
        Why are you waiting for?
      </Typography>
      <Stack alignItems="center" sx={{ maxWidth: '50rem', m: 'auto' }}>
        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          color={colors.dark}
          variant="h5"
        >
          Dive into a streamlined learning experience with our app. Read,
          practice, and repeat with our concise one-liner questions designed for
          efficient exam preparation. Get started now and see the difference it
          can make in your preparation.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Shop />}
          sx={{
            // my: { md: 14, xs: 6 },
            mt: 4,
            backgroundColor: colors.secondary,
            '&:hover': {
              backgroundColor: colors.secondaryVariant,
            },
          }}
          href={process.env.NEXT_PUBLIC_DOWNLOAD_APP_URL}
          target="_blank"
        >
          Download App
        </Button>
      </Stack>
    </Container>
  );
};

export default SectionFour;
