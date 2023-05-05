import * as yup from 'yup';

export const materialSchema = yup.object().shape({
  name: yup.string().min(5).required('Name must be at least 5 character long'),
  category: yup.string().min(1).required('Category is required'),
  link: yup.string(),
  description: yup.string()
});
