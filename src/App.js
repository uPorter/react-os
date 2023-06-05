import styles from './App.css';
import UnityLoader from './components/UnityLoader';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

function App() {
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    // Sürüklenen dosyaların işlemlerini burada yapabilirsiniz
    const files = event.dataTransfer.files;
    console.log('Sürüklenen dosyalar:', files);

    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await toast.promise(onFileUpload(formData), {
          loading: 'Uploading...',
          success: 'Processing...',
          error: 'Upload failed!',
        });
        console.log('Yükleme Tamamlandı:', response.data);
        window.sendMessageToUnity("urlManager", "setURL", response.data);
        window.sendMessageToUnity("urlManager", "SpawnObject");
      } catch (error) {
        console.log('Yükleme Hatası:', error);
      }
    }
  };

  const onFileUpload = async (formData) => {
    try {
      const response = await axios.post(
        'https://3ec8-152-32-192-31.ngrok-free.app/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Yükleme Yüzdesi:', percentage);
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ backgroundColor: isDragging ? 'lightblue' : 'white' }}
      className={styles.container}
    >
      <UnityLoader></UnityLoader>
    </div>
  );
}

export default App;
