import React, { useState } from "react";
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import { Toaster, toast } from "sonner";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import LinearProgress from "@mui/joy/LinearProgress";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Close from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import ToastContent from './ToastComponent';


const ToastComponent = ({ uploadProgress }) => (
  <Alert
    variant="solid"
    sx={{ background: 'rgba(255, 255, 255, 0)!important', width: "var(--width)", gap: 2 }}
    endDecorator={
      <IconButton
        variant="soft"
        color="warning"
        onClick={() => toast.dismiss()}
      >
        <Close />
      </IconButton>
    }
  >
    <Box sx={{ flexGrow: 1 }}>
      Joy UI feat. Sonner is awesome!
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <LinearProgress
          value={uploadProgress}
          variant="soft"
          color="warning"
          determinate
        />
        <Typography ml={1} level="body3" textColor="inherit">
          {uploadProgress}%
        </Typography>
      </Box>
    </Box>
  </Alert>
);
export default ToastComponent;