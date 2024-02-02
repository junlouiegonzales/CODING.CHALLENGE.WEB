import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { Formik, FormikHelpers } from 'formik';
import { MESSAGE } from '../../../common/constants/validations';
import {
  CREATE_REFERRAL,
  GET_ALL_REFERRALS,
  UPDATE_REFERRAL,
} from '../api/graphql';
import {
  initCreateReferralForm,
  createReferralValidationSchema,
} from '../api/validations';
import { Referral } from '../api/types';
import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export type Props = {
  selectedReferral: Referral;
  setSelectedReferral: Dispatch<SetStateAction<Referral>>;
};

const ReferralForm: React.FunctionComponent<Props> = ({
  selectedReferral,
  setSelectedReferral,
}: Props) => {
  const formikRef = useRef(null);
  const [error, setError] = React.useState(null);
  const [createReferral] = useMutation(CREATE_REFERRAL, {
    refetchQueries: [GET_ALL_REFERRALS],
  });
  const [updateReferral] = useMutation(UPDATE_REFERRAL, {
    refetchQueries: [GET_ALL_REFERRALS],
  });

  useEffect(() => {
    if (formikRef.current) {
      (formikRef.current as FormikHelpers<Referral>).setValues(
        !_.isEmpty(selectedReferral) ? selectedReferral : initCreateReferralForm
      );
    }
  }, [selectedReferral]);

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          fontWeight="600"
          margin={3}
          sx={{ flexGrow: 1 }}
        >
          {!_.isEmpty(selectedReferral)
            ? 'Update Referral'
            : 'Referral Builder'}
        </Typography>
        <Box paddingX={3}>
          <Formik
            innerRef={formikRef}
            initialValues={initCreateReferralForm}
            validationSchema={createReferralValidationSchema}
            onSubmit={(values: Referral, { resetForm, setSubmitting }) => {
              !_.isEmpty(selectedReferral)
                ? updateReferral({
                    variables: { ...values, referralId: selectedReferral.id },
                    refetchQueries: [GET_ALL_REFERRALS],
                  })
                    .then(() => {
                      setSelectedReferral({});
                      setSubmitting(false);
                      resetForm();
                    })
                    .catch((error) => setError(error))
                : createReferral({
                    variables: { ...values },
                    refetchQueries: [GET_ALL_REFERRALS],
                  })
                    .then(() => {
                      resetForm();
                    })
                    .catch((error) => setError(error));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                {error && (
                  <Box pt={2} pb={4}>
                    <Alert severity="error">{MESSAGE.ERROR}</Alert>
                  </Box>
                )}
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="gray"
                  letterSpacing="1px"
                >
                  PERSONAL DETAILS
                </Typography>
                <Divider />
                <Stack marginTop={3} direction="row" gap={4}>
                  <TextField
                    name="givenName"
                    value={values?.givenName}
                    error={Boolean(errors?.givenName && touched?.givenName)}
                    onChange={handleChange}
                    label="GIVEN NAME"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="surname"
                    value={values.surname}
                    error={Boolean(errors?.surname && touched?.surname)}
                    onChange={handleChange}
                    label="SURNAME"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
                <Stack marginTop={2} marginBottom={4} direction="row" gap={4}>
                  <TextField
                    name="email"
                    value={values.email}
                    error={Boolean(errors?.email && touched?.email)}
                    onChange={handleChange}
                    label="EMAIL"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="phone"
                    value={values.phone}
                    error={Boolean(errors?.phone && touched?.phone)}
                    onChange={handleChange}
                    label="PHONE (9999) 999-9999)"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="gray"
                  letterSpacing="1px"
                >
                  ADDRESS
                </Typography>
                <Divider />
                <Stack marginTop={3} marginBottom={4} direction="row" gap={4}>
                  <TextField
                    name="homeNameNumber"
                    value={values.homeNameNumber}
                    error={Boolean(
                      errors?.homeNameNumber && touched?.homeNameNumber
                    )}
                    onChange={handleChange}
                    label="HOME NAME OR #"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="street"
                    value={values.street}
                    error={Boolean(errors?.street && touched?.street)}
                    onChange={handleChange}
                    label="STREET"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
                <Stack marginTop={2} marginBottom={4} direction="row" gap={4}>
                  <TextField
                    name="suburb"
                    value={values.suburb}
                    error={Boolean(errors?.suburb && touched?.suburb)}
                    onChange={handleChange}
                    label="SUBURB"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="state"
                    value={values.state}
                    error={Boolean(errors?.state && touched?.state)}
                    onChange={handleChange}
                    label="STATE"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
                <Stack marginTop={2} marginBottom={4} direction="row" gap={4}>
                  <TextField
                    name="postcode"
                    value={values.postcode}
                    error={Boolean(errors?.postcode && touched?.postcode)}
                    onChange={handleChange}
                    label="POST CODE"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="country"
                    value={values.country}
                    error={Boolean(errors?.country && touched?.country)}
                    onChange={handleChange}
                    label="COUNTRY"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>

                {/* <input
                  id="addPhoto"
                  type="file"
                  accept="image/*"
                  className={styles.inputFile}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const file = e.target.files;
                    if (file) {
                      setFieldValue('file', file[0]);
                    }
                  }}
                /> */}

                <Stack
                  direction="row"
                  paddingTop={2}
                  paddingBottom={4}
                  justifyContent="flex-end"
                  gap={4}
                >
                  {/* <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <label htmlFor="addPhoto" className={styles.labelFile}>
                      Upload Avatar
                    </label>
                  </Box> */}
                  {!_.isEmpty(selectedReferral) && (
                    <Button
                      disabled={isSubmitting}
                      size="large"
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      onClick={() => setSelectedReferral({})}
                    >
                      CANCEL
                    </Button>
                  )}
                  {!_.isEmpty(selectedReferral) ? (
                    <Button
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                    >
                      {isSubmitting ? 'LOADING...' : 'UPDATE REFERRAL'}
                    </Button>
                  ) : (
                    <Button
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      {isSubmitting ? 'LOADING...' : 'CREATE REFERRAL'}
                    </Button>
                  )}
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReferralForm;
