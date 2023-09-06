import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react"

export enum AlertType {
  ERROR,
  WARNING,
  INFO,
  SUCCESS
}

export interface AlertProviderProps {
  autoHideDuration?: number
  children: React.ReactNode
}

export interface AlertContextValue {
  showAlert: (type: AlertType, message: string) => void
}

export const AlertContext = React.createContext<AlertContextValue>({
  showAlert: (type: AlertType, message: string) => {}
})

export interface Alert {
  message: string,
  type: AlertType
}
export const AlertProvider = ({ children, autoHideDuration }: AlertProviderProps) => {
  const [alert, setAlert] = useState<Alert|undefined>()
  const [open, setOpen] = useState(false)

  const showAlert = useCallback((type: AlertType, message: string) => {
    setOpen(true)
    setAlert({
      message,
      type
    })
  }, [])

  const closeAlert = useCallback(() => {
    setOpen(false);
    setAlert(undefined)
  }, [])

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration || 6000 }
        onClose={closeAlert}
      >
        <Alert
          severity={
            alert?.type === AlertType.ERROR ? "error" :
              alert?.type === AlertType.WARNING ? "warning" :
                alert?.type === AlertType.INFO ? "info" : "success"
          }
          sx={{ width: '100%' }}
          onClose={closeAlert}>
          {alert?.message}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return React.useContext(AlertContext)
} 