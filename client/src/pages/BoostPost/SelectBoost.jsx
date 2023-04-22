import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export default function SelectBoost(props) {
  const [age, setAge] = React.useState('');


  const handleChange = (event) => {
    setAge(event.target.value);
    props.onData(event.target.value)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">{age == "" ? 50000 : age }</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          {/* <em>None</em> */}
        </MenuItem>
        <MenuItem value={50000}>50,000</MenuItem>
        <MenuItem value={100000}>One Lakh</MenuItem>
        <MenuItem value={200000}>Two Lakh</MenuItem>
        <MenuItem value={300000}>Three Lakh</MenuItem>
      </Select>
      <FormHelperText variant='h6' >Select Reach</FormHelperText>
    </FormControl>
  );
}