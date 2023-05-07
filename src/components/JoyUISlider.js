import { useState } from 'react';
import Slider from '@mui/joy/Slider';

function JoyUISlider() {
  const [value, setValue] = useState(50); // varsayılan değer
  const [textValue, setTextValue] = useState('50'); // text değeri

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    setTextValue(newValue.toString()); // slider değerini string'e dönüştürerek text değerini güncelle
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Slider value={value} onChange={handleSliderChange} />
      <div style={{ marginLeft: '16px' }}>{textValue}</div>
    </div>
  );
}

export default JoyUISlider;
