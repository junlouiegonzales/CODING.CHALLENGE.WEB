import * as React from 'react';
import { FunctionComponent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateForm from './create-form';

export type Props = { open: boolean; onClose: () => void };

const CreateModal: FunctionComponent<Props> = (props: Props) => {
  const { open, ...rest } = props;
  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <CreateForm {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
