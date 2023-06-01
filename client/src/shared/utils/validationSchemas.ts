import * as yup from 'yup';
import { MAX_FILE_SIZE, isValidFileType } from './helpers';

const baseFormSchema = (fieldName: string): yup.ObjectShape => ({
  name: yup
    .string()
    .min(5, `${fieldName} name must be at least 5 character long`)
    .required(`${fieldName} name is required`),
  description: yup
    .string()
    .min(5, `${fieldName} description must be at least 5 characters long`)
    .required(`${fieldName} description is required`),
  image: yup
    .mixed<FileList | File>()
    .test('is-valid-type', 'Invalid image type', (value) => {
      if (value) {
        if (typeof value === 'string') return true;
        return isValidFileType(
          value instanceof FileList ? value[0].name.toLowerCase() : value.name.toLowerCase(),
          'image'
        );
      }
    })
    .test('is-valid-size', 'Maximum allowed image size is 3MB', (picture) => {
      if (picture) {
        if (typeof picture === 'string') return true;
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

export const courseSchema = yup.object().shape(baseFormSchema('Course'));

export const learningPathSchema = yup.object().shape(baseFormSchema('Learning Path'));

export const lessonSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Lesson title must be at least 5 character long')
    .required('Lesson title is required'),
  link: yup
    .string()
    .url('Lesson link must be a valid URL')
    .required('Lesson link is required'),
});
