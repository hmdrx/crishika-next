'use client';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
  const date = new Date();
  const getYear = date.getFullYear();

  return (
    <div>
      <Box
        sx={{
          p: 0,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      ></Box>
      <Box sx={{ bgcolor: '#344457b5', py: 4 }}>
        <Container>
          <Stack
            direction={{ md: 'row' }}
            justifyContent="space-evenly"
            sx={{ mb: 6 }}
          >
            <Stack alignItems="flex-start">
              <Link onClick={() => window.scrollTo(0, 0)} href="/">
                <Typography
                  sx={{
                    px: 1,
                    border: 1,
                    textTransform: 'uppercase',
                  }}
                  color="white"
                  variant="h5"
                >
                  Crishika
                </Typography>
              </Link>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                support@crishika.com
              </Typography>
              {/* <Typography sx={{ py: 1 }} color="white" variant="caption">
                Phone +91 8349006546
              </Typography> */}
            </Stack>

            <Stack>
              <Typography
                sx={{ py: 1, fontWeight: 'bold' }}
                color="white"
                variant="body2"
              >
                Locate Us
              </Typography>
              {/* <Typography sx={{ py: 1 }} color="white" variant="caption">
                Nawagaon
              </Typography> */}
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                Deobhog, gariyaband CG
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                493890 IN
              </Typography>
            </Stack>
            <Stack>
              <Box sx={{ my: 1 }}>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  href="/privacyPolicy"
                >
                  <Typography
                    sx={{
                      py: 1,
                      ':hover': {
                        textDecoration: 'underline',
                        cursor: 'default',
                      },
                    }}
                    color="white"
                    variant="caption"
                  >
                    Privacy policy
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ my: 1 }}>
                <Link onClick={() => window.scrollTo(0, 0)} href="/donation">
                  <Typography
                    sx={{
                      py: 1,
                      ':hover': {
                        textDecoration: 'underline',
                        cursor: 'default',
                      },
                    }}
                    color="white"
                    variant="caption"
                  >
                    Donate ❤️
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ my: 1 }}>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  href="/account-delete"
                >
                  <Typography
                    sx={{
                      py: 1,
                      ':hover': {
                        textDecoration: 'underline',
                        cursor: 'default',
                      },
                    }}
                    color="white"
                    variant="caption"
                  >
                    Delete my Account
                  </Typography>
                </Link>
              </Box>
            </Stack>
          </Stack>
          <Divider />

          <Typography
            variant="caption"
            color="white"
            sx={{ display: 'block', textAlign: 'center' }}
          >
            Copyright &#169; {getYear} All Rights Reserved by Crishika
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
