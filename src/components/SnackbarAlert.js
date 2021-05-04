import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useUIState, useUIDispatch } from "../context/ui";

export default function SnackbarAlert() {
  const { snackbar } = useUIState();
  const uiDispatch = useUIDispatch();
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={() => uiDispatch("SNACKBAR", { open: false })}
      anchorOrigin={{vertical:"top",horizontal:"center"}}
    >
      <Alert
        onClose={() => uiDispatch("SNACKBAR", { open: false })}
        severity={snackbar.type}
      >
        {snackbar.msg}
      </Alert>
    </Snackbar>
  );
}
