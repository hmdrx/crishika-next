import { Box, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { colors } from '../constants/colors';
import Image from 'next/image';
import noMoneyImage from '../assets/images/no-money.png';
const SectionOne = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Stack
        direction={{ md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" color={colors.dark}>
            Free Forever
          </Typography>
          <Typography
            sx={{ my: 2, fontSize: '1.6rem' }}
            color={colors.dark}
            variant="body1"
          >
            No charges, no limits. Our app is your forever companion in your
            educational endeavors.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '16rem', marginX: 'auto' }}>
            <Image
              style={{
                width: '100%',
                height: 'auto',
              }}
              src={noMoneyImage}
              alt="hero image"
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default SectionOne;
