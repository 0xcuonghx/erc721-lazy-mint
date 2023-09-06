import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useDisconnect, useAccount } from 'wagmi';
import { truncateAddress } from '@/app/lib/utils/truncate';
import LogoutIcon from '@mui/icons-material/Logout';
import { jocTokenVestingABI } from '@/app/lib/constants/abis/abis';

export default function DropdownMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='dropdown-menu'
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='outlined'
      >
        <Typography>{address && truncateAddress(address)}</Typography>
      </Button>
      <Menu
        id='dropdown-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Divider />
        <MenuItem onClick={() => disconnect()}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Disconnect</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
