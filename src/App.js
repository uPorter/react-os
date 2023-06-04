import styles from './App.css';
import UnityLoader from './components/UnityLoader';
import { useRef, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from "sonner";

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const unityLoaderRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await toast.promise(
        axios.post('https://3ec8-152-32-192-31.ngrok-free.app/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentage);
          },
        }),
        {
          loading: 'Uploading...',
          success: 'Processing...',
          error: 'Upload failed!',
        }
      );
      console.log(response.data);
      unityLoaderRef.current.sendMessage("urlManager", "setURL", response.data);
      unityLoaderRef.current.sendMessage("urlManager", "SpawnObject");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onFileUpload}
      style={{ backgroundColor: isDragging ? 'lightblue' : 'white' }}
      className={styles.container}
    >
      <UnityLoader ref={unityLoaderRef}></UnityLoader>
    </div>
  );
}

export default App;
