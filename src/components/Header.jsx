'use client';
import React from 'react';
import { Box, Container } from '@mui/material';
import logo from '../assets/images/logo-text.png';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <Box sx={{ bgcolor: '#25bf7770' }}>
      <Container>
        <Link href="/">
          <Box sx={{ maxWidth: '8rem', py: '1rem' }}>
            <Image
              src={logo}
              alt="crishika_logo"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Link>
      </Container>
    </Box>
  );
};

export default Header;
