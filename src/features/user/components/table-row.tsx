import * as React from 'react';
import { IconButton, Stack, TableCell, TableRow } from '@mui/material';
import { FunctionComponent } from 'react';
import { User } from '../api/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { REMOVE_USER, GET_ALL_USERS } from '../api/graphql';
import { useMutation } from '@apollo/client';

export type Props = { item: User };

const TableRowComponent: FunctionComponent<Props> = (props: Props) => {
  const { item } = props;

  const [deleteUser, { loading }] = useMutation(REMOVE_USER, {
    refetchQueries: [GET_ALL_USERS],
  });

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      hover={true}
    >
      <TableCell component="th" scope="user">
        {item.firstName}
      </TableCell>
      <TableCell>{item.lastName}</TableCell>
      <TableCell align="right">{item.contactNumber}</TableCell>
      <TableCell align="right">
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <IconButton
            aria-label="delete"
            disabled={loading}
            onClick={() => {
              deleteUser({
                variables: {
                  userId: item.id,
                },
                refetchQueries: [GET_ALL_USERS],
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
