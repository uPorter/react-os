// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Button from '@mui/joy/Button';
import { Toaster, toast } from "sonner";
import Typography from "@mui/joy/Typography";

function FileUpload(props) {
  const { setUploadOpen } = props;
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileURL, setFileURL] = useState('');

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://9ab9-103-133-178-51.ngrok-free.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentage);
        },
      });
      console.log(response.data);
      await setFileURL(response.data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(fileURL);
      window.sendMessageToUnity("urlManager", "SetURL", fileURL);
      window.sendMessageToUnityBasic("urlManager", "SpawnObject");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='fileUploadContainer'>
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
        <Button onClick={async () => {
          try {
            const response = await toast.promise(
              onFileUpload(),
              {
                loading: 'Uploading...',
                success: 'Proccesing...',
                error: 'Upload failed!',
              }
            );
            console.log(response.data);
            setUploadOpen(false);
          } catch (error) {
            console.log(error);
          }
        }}>Upload</Button>
      </div>
    </div>
  );
}
export default FileUpload;
