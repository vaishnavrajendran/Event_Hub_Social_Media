// import { Button, Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import { Notifications } from '@mui/icons-material';
import { Button, Dialog, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

function FullscreenDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const styles = {
    dialogContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      position: "fixed",
      top: 0,
      right: 0,
      width: "30%",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      overflow: "auto",
    },
    dialogContent: {
      width: "25vw",
      borderRadius: "10px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#333333",
    },
    dialogTitle: {
      margin: "0",
      paddingBottom: "10px",
      borderBottom: "1px solid #CCCCCC",
    },
    dialogText: {
      margin: "0",
      paddingTop: "20px",
    },
  };

  return (
    <>
      <Notifications
       sx={{ fontSize: "25px" }}
       onClick={() => setOpen(true)}
       />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={styles.dialogContainer}>
          <div style={styles.dialogContent}>

          </div>
        </div>
      </Dialog>
    </>
  );
}

export default FullscreenDialog;
