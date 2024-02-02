import * as Yup from 'yup';
import { MESSAGE, REGEX } from '../../../common/constants/validations';

export const createReferralValidationSchema = Yup.object().shape({
  givenName: Yup.string().required(MESSAGE.REQUIRED),
  surname: Yup.string().required(MESSAGE.REQUIRED),
  phone: Yup.string()
    .required(MESSAGE.REQUIRED)
    .matches(REGEX.CELLPHONE, MESSAGE.INVALID_VALUE),
  email: Yup.string().email(MESSAGE.INVALID_VALUE).required(MESSAGE.REQUIRED),
  homeNameNumber: Yup.string().required(MESSAGE.REQUIRED),
  street: Yup.string().required(MESSAGE.REQUIRED),
  suburb: Yup.string().required(MESSAGE.REQUIRED),
  state: Yup.string().required(MESSAGE.REQUIRED),
  postcode: Yup.string().required(MESSAGE.REQUIRED),
  country: Yup.string().required(MESSAGE.REQUIRED),
});

export const initCreateReferralForm = {
  givenName: '',
  surname: '',
  phone: '',
  email: '',
  homeNameNumber: '',
  street: '',
  suburb: '',
  state: '',
  postcode: '',
  country: '',
  file: null,
};
