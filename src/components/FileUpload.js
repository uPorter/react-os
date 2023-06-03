// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
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

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://3ec8-152-32-192-31.ngrok-free.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentage);
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className='fileUploadContainer'>
      <GlobalStyles
        styles={(theme) => `
        [data-sonner-toaster][data-theme] {
          font-family: ${theme.vars.fontFamily.body};
          font-size: ${theme.fontSize.md};
          --border-radius: ${theme.vars.radius.sm};
          --normal-bg: ${theme.vars.palette.background.surface};
          --normal-border: ${theme.vars.palette.divider};
          --normal-text: ${theme.vars.palette.text.primary};
          --success-bg: ${theme.vars.palette.success.softBg};
          --success-border: rgb(${theme.vars.palette.success.mainChannel} / 0.2);
          --success-text: ${theme.vars.palette.success.softColor};
          --error-bg: ${theme.vars.palette.danger.softBg};
          --error-border: rgb(${theme.vars.palette.danger.mainChannel} / 0.2);
          --error-text: ${theme.vars.palette.danger.softColor};
          --gray1: ${theme.vars.palette.neutral[50]};
          --gray2: ${theme.vars.palette.neutral[100]};
          --gray3: ${theme.vars.palette.neutral[200]};
          --gray4: ${theme.vars.palette.neutral[300]};
          --gray5: ${theme.vars.palette.neutral[400]};
          --gray6: ${theme.vars.palette.neutral[500]};
          --gray7: ${theme.vars.palette.neutral[600]};
          --gray8: ${theme.vars.palette.neutral[700]};
          --gray9: ${theme.vars.palette.neutral[800]};
          --gray10: ${theme.vars.palette.neutral[900]};
        }
        &.sonner-toast-warn {
          --normal-bg: ${theme.vars.palette.warning.softBg};
          --normal-border: rgb(${theme.vars.palette.warning.mainChannel} / 0.2);
          --normal-text: ${theme.vars.palette.warning.softColor};
        }
      `}
      />
      <div className='fileUploaderHolder'>
        <Dropzone className='fileDropZone' onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className='file-text-holder' style={{ width: 400, height: 200 }}>
              <input {...getInputProps()} />
              {file ? <Typography level="body1">{file.name}</Typography> : <Typography level="body1">Lets Upload!</Typography>}
            </div>
          )}
        </Dropzone>
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        <Button onClick={() => {
          onFileUpload();
          toast.custom((t) => (
            <Alert
              variant="solid"
              sx={{ background: 'rgba(255, 255, 255, 0)!important', width: "var(--width)", gap: 2, boxShadow: "md" }}
              endDecorator={
                <IconButton
                  variant="soft"
                  color="warning"
                  onClick={() => toast.dismiss(t)}
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
          ));
          
        }}>Upload</Button>
      </div>
    </div>
  );
}
export default FileUpload;
