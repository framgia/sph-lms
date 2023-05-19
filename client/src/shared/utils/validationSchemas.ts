import * as yup from 'yup';
import { MAX_FILE_SIZE, isValidFileType } from './helpers';

export const courseSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Course name must be at least 5 character long')
    .required('Course name is required'),
  description: yup.string(),
  image: yup
    .mixed<FileList | File>()
    .test('is-valid-type', 'Invalid image type', (value) => {
      if (value) {
        return isValidFileType(
          value instanceof FileList ? value[0].name.toLowerCase() : value.name.toLowerCase(),
          'image'
        );
      }
    })
    .test('is-valid-size', 'Maximum allowed image size is 3MB', (picture) => {
      if (picture) {
        const size = picture instanceof FileList ? picture[0].size : picture.size;
        return size <= MAX_FILE_SIZE;
      }
    }),
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
