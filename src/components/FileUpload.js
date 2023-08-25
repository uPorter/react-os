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
    
    const fileType = file.name.split('.').pop().toLowerCase();
    
    try {
      let response;
      
      if (fileType === 'pdf') {
        response = await axios.post('https://26ec-103-133-178-51.ngrok-free.app/convert', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentage);
          },
        });
  
        console.log(response.data);
      }else if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
        response = await axios.post('https://26ec-103-133-178-51.ngrok-free.app/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentage);
          },
        });

        window.sendMessageToUnity('imageUrlManager', 'SetURL', response.data);
        window.sendMessageToUnityBasic('imageUrlManager', 'SpawnObject');
        console.log(response.data);
      } else if (fileType === 'mp4') {
        response = await axios.post('https://26ec-103-133-178-51.ngrok-free.app/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentage);
          },
        });

        window.sendMessageToUnity('videoUrlManager', 'SetURL', response.data);
        window.sendMessageToUnityBasic('videoUrlManager', 'SpawnObject');
        console.log(response.data);
      } else if (fileType === 'glb') {
        response = await axios.post('https://26ec-103-133-178-51.ngrok-free.app/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentage);
          },
        });

        window.sendMessageToUnity('urlManager', 'SetURL', response.data);
        window.sendMessageToUnityBasic('urlManager', 'SpawnObject');
        console.log(response.data);
      } else {
        toast.error('Unsupported File Type...')
      }

      
        console.log(response.data);
        // Diğer dosya türleri için yapılacak işlemler buraya eklenir.
      
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="fileUploadContainer">
      <div className="fileUploaderHolder">
        <Dropzone
          className="fileDropZone"
          style={{ width: "100%", height: "100%" }}
          onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="file-text-holder"
              style={{ width: 400, height: 200 }}
            >
              <input {...getInputProps()} />
              {file ? (
                <Typography
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                    color: "#ffffff85",
                    fontWeight: 600,
                  }}
                  level="body1"
                >
                  {file.name}
                </Typography>
              ) : (
                <Typography
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                    color: "#ffffff85",
                    fontWeight: 600,
                  }}
                  level="body1"
                >
                  Drag files here
                </Typography>
              )}

              <div
                style={{ width: "500px", color: "#ffffff7d" }}
                className="mb-8 text-gray-400"
              >
                We support 3D models, images, videos, documents, and more!{" "}
                <a
                  href="https://support.spatial.io/hc/en-us/articles/360036170911-Uploading-Content-Supported-File-Types"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    style={{ filter: "invert(1)" }}
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00016 0.333496C3.32016 0.333496 0.333496 3.32016 0.333496 7.00016C0.333496 10.6802 3.32016 13.6668 7.00016 13.6668C10.6802 13.6668 13.6668 10.6802 13.6668 7.00016C13.6668 3.32016 10.6802 0.333496 7.00016 0.333496ZM7.66683 11.6668H6.3335V10.3335H7.66683V11.6668ZM9.04683 6.50016L8.44683 7.1135C7.96683 7.60016 7.66683 8.00016 7.66683 9.00016H6.3335V8.66683C6.3335 7.9335 6.6335 7.26683 7.1135 6.78016L7.94016 5.94016C8.18683 5.70016 8.3335 5.36683 8.3335 5.00016C8.3335 4.26683 7.7335 3.66683 7.00016 3.66683C6.26683 3.66683 5.66683 4.26683 5.66683 5.00016H4.3335C4.3335 3.52683 5.52683 2.3335 7.00016 2.3335C8.4735 2.3335 9.66683 3.52683 9.66683 5.00016C9.66683 5.58683 9.42683 6.12016 9.04683 6.50016Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </div>
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
        }} style={{ background: "rgb(0 0 0 / 40%)" }}>Upload</Button>
      </div>
    </div>
  );
}
export default FileUpload;
