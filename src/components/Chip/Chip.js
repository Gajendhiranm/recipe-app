import * as React from 'react';
import Chip from '@mui/material/Chip';


const getRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};



export default function SizesChips(props) {
  const randomColor = getRandomColor();

  return (
      <Chip label={props.name} size="small" variant="outlined" style={{ borderColor: randomColor,fontWeight:600 }}/>
  );
}