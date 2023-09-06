'use client';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import ConnectDialog from './ConnectDialog';
import DropdownMenu from './DropdownMenu';
import useMounted from '@/app/hooks/useMounted';

export default function AppBar() {
  const isMounted = useMounted();
  const { isConnected } = useAccount();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MuiAppBar position='fixed' sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <Typography
          variant='h6'
          noWrap
          component='div'
          color='black'
          sx={{ flexGrow: 1 }}
        >
          Lazy Mint Demo
        </Typography>
        {isMounted && isConnected ? (
          <DropdownMenu />
        ) : (
          <IconButton
            size='large'
            edge='start'
            sx={{ mr: 2 }}
            onClick={handleClickOpen}
          >
            <AccountBalanceWalletIcon />
          </IconButton>
        )}
        <ConnectDialog open={open} onClose={handleClose} />
      </Toolbar>
    </MuiAppBar>
  );
}
