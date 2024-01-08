import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import User from './user';

const App: FunctionComponent = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            fontWeight="600"
            sx={{ flexGrow: 1 }}
          >
            Coding Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <User />
    </>
  );
};

export default App;
