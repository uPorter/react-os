import styles from './App.css';
import UnityLoader from './components/UnityLoader';
import { ChangeEvent, useState, useEffect, useCallback } from 'react';

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

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    // Sürüklenen dosyaların işlemlerini burada yapabilirsiniz
    const files = event.dataTransfer.files;
    console.log('Sürüklenen dosyalar:', files);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop} 
      style={{backgroundColor: isDragging ? 'lightblue' : 'white' }}
      className={styles.container}>
      <UnityLoader></UnityLoader>

    </div>
  );
}

export default App;