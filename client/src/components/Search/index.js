import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous() {

  const [type, setType] = React.useState("");
  const { allUsers } = useSelector(state => state)
    const navigate = useNavigate();
  const filterOptions = (allUsers, { inputValue }) => {
    setType(inputValue);
    if (inputValue === "") {
      return [];
    }
    return allUsers.filter((option) =>
      option.firstName.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleOptionSelected = (event, value) => {
    if (value) {
        navigate(`/profile/${value._id}`);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...allUsers]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading,type]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // isOptionEqualToValue={(option, value) => option.title === value.title}
      filterOptions={filterOptions}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName} - ${option.occupation}` }
      options={allUsers}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for User"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      onChange={handleOptionSelected}
    />
  );
}