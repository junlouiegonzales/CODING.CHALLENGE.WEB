import * as React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { GET_ALL_REFERRALS } from './api/graphql';
import { useQuery } from '@apollo/client';
import { GetAllReferrals, Referral } from './api/types';
import ReferralForm from './components/referral-form';
import TableRowComponent from './components/table-row';
import { useState } from 'react';

function App() {
  const { loading, data } = useQuery<GetAllReferrals>(GET_ALL_REFERRALS, {
    fetchPolicy: 'cache-and-network',
  });

  const [selectedReferral, setSelectedReferral] = useState<Referral>({});

  return (
    <>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={5}>
          <ReferralForm
            selectedReferral={selectedReferral}
            setSelectedReferral={setSelectedReferral}
          />
        </Grid>
        <Grid item xs={7}>
          <Card>
            <CardContent>
              <Box padding={3}>
                <TableContainer>
                  {!data && loading && <p>Loading, please wait...</p>}
                  {data &&
                    data.getAllReferrals &&
                    data.getAllReferrals.length < 1 && (
                      <p>No items to be displayed</p>
                    )}
                  {data &&
                    data.getAllReferrals &&
                    data.getAllReferrals.length >= 1 && (
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>GIVEN NAME</TableCell>
                            <TableCell>SURNAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>PHONE</TableCell>
                            <TableCell align="right">ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.getAllReferrals.map((t, i) => (
                            <TableRowComponent
                              item={t}
                              key={i}
                              selectedReferral={selectedReferral}
                              setSelectedReferral={setSelectedReferral}
                            ></TableRowComponent>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
