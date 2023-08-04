import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { withStyles } from '@mui/styles';

// Stil objesi ile MUI tooltip öğesini özelleştiriyoruz
const EditTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f50057', // Özel arka plan rengi
    color: '#fff', // Özel metin rengi
  },
}))(Tooltip);

export default EditTooltip;