import * as yup from 'yup';
import { MAX_FILE_SIZE, isValidFileType } from './helpers';

export const courseSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Course name must be at least 5 character long')
    .required('Course name is required'),
  description: yup.string(),
  image: yup
    .mixed<FileList>()
    .test('is-valid-type', 'Invalid image type', (value) => {
      if (value && value?.length > 0) {
        return isValidFileType(value[0].name.toLowerCase() ?? '', 'image');
      }
    })
    .test(
      'is-valid-size',
      'Maximum allowed image size is 3MB',
      (picture) => picture && picture.length > 0 && picture[0].size <= MAX_FILE_SIZE
    ),
  category: yup
    .array()
    .min(1, 'At least 1 category required')
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
});

export const lessonSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Lesson title must be at least 5 character long')
    .required('Lesson title is required'),
  link: yup
    .string()
    .min(5, 'Lesson link must be at least 5 character long')
    .required('Lesson link is required'),
});
