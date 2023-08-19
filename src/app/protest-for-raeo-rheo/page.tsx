'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { colors } from '@/constants/colors';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

type Tdata = {
  sr: number;
  name: string;
};

function App() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [protesters, setProtesters] = useState<Tdata[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sendingMail, setSendingMail] = React.useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    vertical: 'bottom' | 'top';
    horizontal: 'center';
    severity: 'success';
    message: string;
  }>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    severity: 'success',
    message: '',
  });

  const fetchProtester = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/protester`
      );
      res.data.protester.reverse();

      // Find the index of the 'hum' protester
      const data = getLocalData();
      const myIndex = res.data.protester.findIndex(
        (el: any) => el._id === data?._id
      );

      if (myIndex !== -1) {
        // If 'hum' protester is found, remove it from its current position and insert it at the beginning
        const MeProtester = res.data.protester.splice(myIndex, 1)[0];
        res.data.protester.unshift(MeProtester);
      }
      const cdata = res.data.protester.map((el: any, index: any) => ({
        sr: index + 1,
        name: el.name,
      }));
      setProtesters(cdata);
    } catch (error: any) {
      handleClick({
        vertical: 'bottom',
        horizontal: 'center',
        severity: 'error',
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const isMailSent = (): 'sent' | 'notSent' | 'notInit' => {
    if (localStorage.getItem('protester')) {
      const text = localStorage.getItem('protester');
      const data = JSON.parse(text || '');
      if (data?.sentMail === false) {
        return 'notSent';
      } else {
        return 'sent';
      }
    } else {
      return 'notInit';
    }
  };
  const getLocalData = () => {
    if (localStorage.getItem('protester')) {
      const text = localStorage.getItem('protester');
      const data = JSON.parse(text || '');
      return data;
    }
  };
  useEffect(() => {
    fetchProtester();
    const status = isMailSent();
    if (status === 'notSent') {
      setOpen(true);
    }
  }, [fetchProtester]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendEmail = async () => {
    setSendingMail(true);

    try {
      const status = isMailSent();
      if (status === 'sent') {
        handleClick({
          vertical: 'bottom',
          horizontal: 'center',
          severity: 'error',
          message: 'You already sent email',
        });
        setSendingMail(false);
        return;
      }

      const validateName = (name: string) => {
        const trimmedName = name.trim();

        if (trimmedName.length === 0) {
          return 'Please enter your name';
        }

        if (trimmedName.length < 3) {
          return 'Name must be at least 3 characters long';
        }

        if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
          return 'Name contains invalid characters';
        }

        return null; // Validation successful
      };

      // if (name.trim().length === 0) {
      //   setError('Please enter your name');
      //   return;
      // }
      // if (name.length < 3 || /\d/.test(name)) {
      //   setError('Please enter a valid name');
      //   return;
      // }
      const validationError = validateName(name);

      if (validationError) {
        setError(validationError);

        return;
      }

      if (status === 'notSent') {
        const data = getLocalData();
        const res1 = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/protester`,
          {
            _id: data._id,
            name: name,
          }
        );

        if (res1.status === 200) {
          localStorage.setItem(
            'protester',
            JSON.stringify(res1.data.protester)
          );
          fetchProtester();
          setSendingMail(false);
        }
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/protester`,
        {
          name: name,
        }
      );

      if (res.status === 201) {
        localStorage.setItem('protester', JSON.stringify(res.data.protester));
        await fetchProtester();
        const recipients = process.env.NEXT_PUBLIC_EMAIL_LIST!;
        const recipientList = recipients
          .split(/[,;]/)
          .map(email => email.trim())
          .join('; ');
        const subject = 'मांग RAEO | RHEO';
        const body = `#ईमेल स्ट्राइक \n\nहोश में आओ कका होश में आओ। RAEO | RHEO पोस्ट लाओ।\n\n❌ कका अगर ये पोस्ट न आए तो ❌अबकी बार तुम नहीं यार❌\n\nभेजईय्या\n${name}`;

        let mailtoLink;

        // Determine the user's device and open the appropriate email client
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
          mailtoLink = `mailto:${recipientList}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`;
        } else if (/Android/.test(navigator.userAgent)) {
          mailtoLink = `intent://send?to=${recipientList}&subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(
            body
          )}#Intent;scheme=mailto;package=com.google.android.gm;end`;
        } else {
          mailtoLink = `mailto:${recipientList}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`;
        }
        setSendingMail(false);
        setOpen(true);

        window.location.href = mailtoLink;
      } else {
        handleClick({
          vertical: 'bottom',
          horizontal: 'center',
          severity: 'error',
          message: 'Pls try again later',
        });
      }
    } catch (error: any) {
      handleClick({
        vertical: 'bottom',
        horizontal: 'center',
        severity: 'error',
        message: error.message,
      });
    } finally {
      setSendingMail(false);
    }
  };

  const displayedData = protesters.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleClick = (newState: any) => {
    setSnackbar({ ...newState, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleYes = async () => {
    try {
      const data = getLocalData();
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/protester`,
        {
          _id: data._id,
          sentMail: true,
        }
      );

      if (res.status === 200) {
        localStorage.setItem('protester', JSON.stringify(res.data.protester));
        fetchProtester();
        setOpen(false);
      }
    } catch (error: any) {
      handleClick({
        vertical: 'bottom',
        horizontal: 'center',
        severity: 'error',
        message: error.message,
      });
    }
  };
  const handleNo = async () => {
    try {
      const data = getLocalData();
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/protester`,
        {
          data: {
            _id: data._id,
          },
        }
      );

      if (res.status === 204) {
        localStorage.removeItem('protester');
        fetchProtester();
        setOpen(false);
      }
    } catch (error: any) {
      handleClick({
        vertical: 'bottom',
        horizontal: 'center',
        severity: 'error',
        message: error.message,
      });
    }
  };

  const action = (
    <React.Fragment>
      <Button sx={{ color: 'white' }} size="small" onClick={handleYes}>
        Yes
      </Button>
      <Button sx={{ color: 'white' }} size="small" onClick={handleNo}>
        No
      </Button>
    </React.Fragment>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="क्या आपने ईमेल कर दिया है?"
        action={action}
      />
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
      <Typography sx={{ mb: 1 }} variant="h5">
        Join Email Protest for RAEO | RHEO
      </Typography>
      <Divider sx={{ mt: 0 }} />
      <Typography sx={{ mt: 2 }} variant="body1">
        #ईमेल प्रोटेस्ट
      </Typography>
      <Typography sx={{ mt: 2 }} variant="body1">
        होश में आओ कका होश में आओ। RAEO | RHEO पोस्ट लाओ।
      </Typography>
      <Typography sx={{ mt: 2 }} variant="body1">
        ❌ कका अगर ये पोस्ट न आए तो ❌अबकी बार तुम नहीं यार❌
      </Typography>
      <Typography sx={{ mt: 2 }} variant="body1">
        भेजईय्या
      </Typography>
      <Stack sx={{ mt: 0 }} direction="row" alignItems="flex-start">
        <TextField
          error={!!error}
          focused={!!error}
          onChange={e => {
            setError('');
            setName(e.target.value);
          }}
          label="Name"
          variant="standard"
          size="small"
          sx={{ mr: 4 }}
          helperText={error}
        />

        <Button
          size="medium"
          disabled={open || sendingMail}
          onClick={handleSendEmail}
          variant="contained"
          sx={{
            backgroundColor: colors.secondary,
            '&:hover': {
              backgroundColor: colors.secondaryVariant,
            },
          }}
        >
          Send Email
        </Button>
      </Stack>

      <Box>
        <Typography sx={{ mb: 1, mt: 4 }} variant="h5">
          Protesters {loading && <CircularProgress color="success" size={20} />}
        </Typography>
        <Divider sx={{ mt: 1 }} />

        {displayedData.map(el => {
          return <Typography key={el.sr}>{`${el.sr}. ${el.name}`}</Typography>;
        })}
        <Divider sx={{ mt: 1 }} />
        <TablePagination
          component="div"
          count={protesters.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
}

export default App;
