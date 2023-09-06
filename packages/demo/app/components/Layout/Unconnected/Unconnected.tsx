import { Box, Button, Container, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ConnectDialog from '../AppBar/ConnectDialog';
import { useState } from 'react';

export default function Unconnected() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: '350px' }}>
        <AccountBalanceWalletIcon />
        <Typography variant='h6'>{`Connect Wallet`}</Typography>
        <Typography>{`Your wallet doesn't connect to website`}</Typography>
        <Button onClick={handleClickOpen} variant='contained'>
          Connect
        </Button>
        <ConnectDialog open={open} onClose={handleClose} />
      </Box>
    </Container>
  );
}
