import { useConnect, useAccount, Connector } from 'wagmi';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { CircularProgress, DialogContent, DialogContentText, Divider } from '@mui/material';
import { useEffect, useCallback } from 'react';

export interface ConnectDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ConnectDialog(props: ConnectDialogProps) {
  const { connect, connectors, isLoading } = useConnect();
  const { isConnected } = useAccount();

  const { onClose, open } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleConnect = useCallback(
    (connector: Connector) => {
      connect({ connector });
      onClose();
    },
    [connect, onClose]
  );

  useEffect(() => {
    if (isConnected) {
      handleClose();
    }
  }, [isConnected, handleClose]);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth >
      <DialogTitle>Connect your wallet</DialogTitle>
      <DialogContent>
        <DialogContentText>{"If you don't have a wallet, you can select a provider and create one now"}</DialogContentText>
      </DialogContent>
      <Divider />
      <List sx={{ pt: 0 }}>
        {connectors.map((connector) => (
          <ListItem disableGutters key={connector.id}>
            <ListItemButton
              disabled={!connector.ready || isLoading}
              onClick={() => handleConnect(connector)}
            >
              {isLoading && <CircularProgress />}
              <ListItemText primary={connector.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
