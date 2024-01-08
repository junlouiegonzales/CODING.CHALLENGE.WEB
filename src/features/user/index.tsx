import * as React from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableRowComponent from './components/table-row';
import { Box, Button, Divider } from '@mui/material';
import { useState } from 'react';
import { GET_ALL_USERS } from './api/graphql';
import { useQuery } from '@apollo/client';
import { GetAllUsers } from './api/types';
import CreateModal from './modals/create-modal';

function App() {
  const [toggle, setToggle] = useState(false);

  const { loading, data } = useQuery<GetAllUsers>(GET_ALL_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <>
      <Container maxWidth="xl">
        <Box paddingTop={5} paddingBottom={5}>
          <Button variant="contained" onClick={() => setToggle(true)}>
            Create
          </Button>
        </Box>
        <Divider />
        <TableContainer>
          {!data && loading && <p>Loading, please wait...</p>}
          {data && data.getAllUsers && data.getAllUsers.length < 1 && (
            <p>No items to be displayed</p>
          )}
          {data && data.getAllUsers && data.getAllUsers.length >= 1 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="right">Contact Number</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.getAllUsers.map((t, i) => (
                  <TableRowComponent item={t} key={i}></TableRowComponent>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
      <CreateModal open={toggle} onClose={() => setToggle(false)} />
    </>
  );
}

export default App;
