import styles from './App.css';
import UnityLoader from './components/UnityLoader';
import { useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';


function App() {
  const [isDragging, setIsDragging] = useState(false);
  const { spaceName } = useParams();

  console.log(spaceName);

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
        const response = await axios.post('https://9ab9-103-133-178-51.ngrok-free.app/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Yükleme Yüzdesi:', percentage);
          },
        });
        console.log('Yükleme Tamamlandı:', response.data);
        window.sendMessageToUnity("urlManager", "SetURL", response.data);
        window.sendMessageToUnity("urlManager", "SpawnObject");
        // İstediğiniz işlemleri burada gerçekleştirebilirsiniz
        // Örneğin, UnityLoader'a mesaj göndermek
      } catch (error) {
        console.log('Yükleme Hatası:', error);
      }
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
      <Router>
        <Routes>
          <Route path='/' element={<UnityLoader/>} />
          <Route path="/space/:spaceName" element={<UnityLoader />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
