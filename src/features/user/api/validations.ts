import * as Yup from 'yup';
import { MESSAGE, REGEX } from '../../../common/constants/validations';

export const createValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(MESSAGE.REQUIRED),
  lastName: Yup.string().required(MESSAGE.REQUIRED),
  contactNumber: Yup.string()
    .required(MESSAGE.REQUIRED)
    .matches(REGEX.CELLPHONE, MESSAGE.INVALID_VALUE),
});

export const initCreateForm = {
  firstName: '',
  lastName: '',
  contactNumber: '',
};
