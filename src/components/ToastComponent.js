import React, { useState } from "react";

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