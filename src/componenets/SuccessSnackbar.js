import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessSnackbar(props) {
  const {handleCloseSnackBar} = props;

  const {snackBarMessage, showSnackBar} = props;

  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      open={showSnackBar}
      autoHideDuration={2000}
      onClose={handleCloseSnackBar}
    >
      <Alert
        onClose={handleCloseSnackBar}
        severity="success"
        sx={{width: '100%'}}
      >
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
}
