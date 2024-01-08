import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { initCreateForm, createValidationSchema } from '../api/validations';
import { CREATE_USER, GET_ALL_USERS } from '../api/graphql';
import { useMutation } from '@apollo/client';
import { MESSAGE } from '../../../common/constants/validations';

export type Props = { onClose: () => void };
const CreateForm: FunctionComponent<Props> = (props: Props) => {
  const { onClose } = props;

  const [createUser, { error, loading }] = useMutation(CREATE_USER, {
    refetchQueries: [GET_ALL_USERS],
  });

  return (
    <>
      <Formik
        initialValues={initCreateForm}
        validationSchema={createValidationSchema}
        onSubmit={({ firstName, lastName, contactNumber }) => {
          createUser({
            variables: {
              firstName,
              lastName,
              contactNumber,
            },
            refetchQueries: [GET_ALL_USERS],
          }).then(() => {
            onClose();
          });
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {error && (
              <Box pb={2}>
                <Alert severity="error">{MESSAGE.ERROR}</Alert>
              </Box>
            )}

            <Box my={2}>
              <TextField
                name="firstName"
                value={values?.firstName}
                error={Boolean(errors?.firstName && touched?.firstName)}
                onChange={handleChange}
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box my={2}>
              <TextField
                name="lastName"
                value={values.lastName}
                error={Boolean(errors?.lastName && touched?.lastName)}
                onChange={handleChange}
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box my={2}>
              <TextField
                name="contactNumber"
                value={values.contactNumber}
                error={Boolean(errors?.contactNumber && touched?.contactNumber)}
                onChange={handleChange}
                label="Contact Number e.g.(9999) 999-9999)"
                fullWidth
                variant="outlined"
              />
            </Box>
            <Stack
              direction="row"
              mt={4}
              mb={1}
              justifyContent="flex-end"
              spacing={2}
            >
              <Button disabled={loading} onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit" variant="contained">
                Create
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateForm;
