import * as React from 'react';
import { IconButton, Stack, TableCell, TableRow } from '@mui/material';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Referral } from '../api/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { REMOVE_REFERRAL, GET_ALL_REFERRALS } from '../api/graphql';
import { useMutation } from '@apollo/client';
import _ from 'lodash';

export type Props = {
  item: Referral;
  selectedReferral: Referral;
  setSelectedReferral: Dispatch<SetStateAction<Referral>>;
};

const TableRowComponent: FunctionComponent<Props> = ({
  item,
  selectedReferral,
  setSelectedReferral,
}: Props) => {
  const [removeReferral, { loading }] = useMutation(REMOVE_REFERRAL, {
    refetchQueries: [GET_ALL_REFERRALS],
  });

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      selected={selectedReferral && item.id === selectedReferral.id}
      hover={true}
    >
      <TableCell component="th" scope="user">
        {item.givenName}
      </TableCell>
      <TableCell>{item.surname}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.phone}</TableCell>
      <TableCell align="right">
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <IconButton
            aria-label="edit"
            disabled={loading}
            onClick={() => {
              setSelectedReferral(item);
            }}
          >
            <EditIcon />
          </IconButton>

          {_.isEmpty(selectedReferral) && (
            <IconButton
              aria-label="delete"
              disabled={loading}
              onClick={() => {
                removeReferral({
                  variables: {
                    referralId: item.id,
                  },
                  refetchQueries: [GET_ALL_REFERRALS],
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
