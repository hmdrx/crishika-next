'use client';
import {
  Alert,
  Box,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import {
  ValidateEmail,
  ValidateMessage,
  ValidateName,
} from '../../utils/Validators';
import { colors } from '@/constants/colors';

const DeleteAccount = () => {
  const [inputs, setInputs] = useState();
  const [error, setError] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    severity: 'success',
    message: '',
  });

  const handleClick = newState => {
    setSnackbar({ ...newState, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const submitHandler = () => {
    const isNameValid = ValidateName(inputs?.name);
    const isEmailValid = ValidateEmail(inputs?.email);
    const isMessageValid = ValidateMessage(inputs?.message);

    if (isNameValid && isEmailValid && isMessageValid) {
      (async () => {
        setLoading(true);
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inquiry/guest`,
            {
              name: inputs.name.trim(),
              email: inputs.email.trim(),
              message: inputs.message.trim(),
            }
          );
          if (res.status === 201) {
            setInputs({ name: '', email: '', message: '' });
            handleClick({
              vertical: 'bottom',
              horizontal: 'center',
              severity: 'success',
              message: res.data.message,
            });
          }
        } catch (error) {
          console.log(error.message);
          handleClick({
            vertical: 'bottom',
            horizontal: 'center',
            severity: 'error',
            message: error.message,
          });
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setError({
        name: !isNameValid,
        email: !isEmailValid,
        message: !isMessageValid,
      });
    }
  };
  return (
    <Container sx={{ my: 8 }}>
      <Typography sx={{ mb: 4 }} align="center" variant="h4">
        Account Deletion Request
      </Typography>
      <Box sx={{ textAlign: 'center', maxWidth: '50rem', m: 'auto' }}>
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: snackbar.vertical,
            horizontal: snackbar.horizontal,
          }}
          open={snackbar.open}
          onClose={handleClose}
          key={snackbar.vertical + snackbar.horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Typography sx={{ mb: 2, fontSize: '1.2rem' }} variant="body1">
          By submitting this form, you are requesting the permanent deletion of
          your Crishika Account associated with the email (if not then mention
          mobile number in reason). Please take a moment to provide us with the
          reason for your account deletion, as your feedback is crucial for our
          continuous improvement
        </Typography>

        <Stack
          sx={{ mb: 2 }}
          // direction={{ md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction={{ md: 'row' }} gap={2} sx={{ width: '100%' }}>
            <TextField
              label="Name *"
              error={error.name}
              focused={error.name}
              helperText={error.name && 'Plz enter valid name'}
              fullWidth
              value={inputs?.name}
              onChange={event => {
                setInputs(prev => {
                  return { ...prev, name: event.target.value };
                });
                setError(prev => {
                  return { ...prev, name: false };
                });
              }}
            />

            <TextField
              label="Email *"
              size="medium"
              error={error.email}
              focused={error.email}
              helperText={error.email && 'Plz enter valid email'}
              fullWidth
              value={inputs?.email}
              onChange={event => {
                setInputs(prev => {
                  return { ...prev, email: event.target.value };
                });
                setError(prev => {
                  return { ...prev, email: false };
                });
              }}
            />
          </Stack>
          {/* <Box display={{ md: 'flex' }}> */}
          <TextField
            id="outlined-multiline-static"
            label="Reason for Account deletion *"
            multiline
            rows={4}
            error={error.message}
            focused={error.message}
            helperText={
              error.message && 'Plz enter message between 10-1000 character'
            }
            fullWidth
            value={inputs?.message}
            onChange={event => {
              setInputs(prev => {
                return { ...prev, message: event.target.value };
              });
              setError(prev => {
                return { ...prev, message: false };
              });
            }}
          />
          {/* </Box> */}

          <Button
            // sx={{ alignSelf: 'flex-start' }}
            disabled={loading}
            sx={{
              alignSelf: 'flex-start',
              mt: 4,
              backgroundColor: colors.secondary,
              '&:hover': {
                backgroundColor: colors.secondaryVariant,
              },
            }}
            variant="contained"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
export default DeleteAccount;
