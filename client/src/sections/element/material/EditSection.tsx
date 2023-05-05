/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable multiline-ternary */
import Button from '@/src/shared/components/Button';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFSelectField from '@/src/shared/components/ReactForm/RFSelectField';
import RFTextField from '@/src/shared/components/ReactForm/RFTextField';
import { getFileType } from '@/src/shared/utils/helper';
import { materialSchema } from '@/src/shared/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { type FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type DetailSectionProps, type MaterialI } from './DetailSection';

const EditSection: FC<DetailSectionProps> = ({ data }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(materialSchema),
    mode: 'onChange'
  });
  const uniType = getFileType(data.type);

  const onSubmit = (data: object): void => {
    // update logic goes here
  };

  useEffect(() => {
    const schemaKeys = Object.keys(materialSchema.fields);
    schemaKeys.forEach((key: string): void => {
      setValue(
        key,
        key === 'category'
          ? data.material_category_name
          : data[key as keyof MaterialI]
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RFInputField
        register={register('name')}
        error={errors?.name?.message as string}
        label={`${uniType} Name`}
      />

      {uniType === 'Link' || uniType === 'Video' ? (
        <RFInputField
          register={register('link')}
          error={errors?.link?.message as string}
          label={`${data.type.toUpperCase() !== 'LINK' ? data.type : ''} URL`}
        />
      ) : (
        <RFInputField
          type="file"
          label={'Upload'}
          className="border-none max-w-max"
        />
      )}

      <RFSelectField
        label="Category"
        options={allCategoryData}
        register={register('category')}
        error={errors.category?.message as string}
      />

      <RFSelectField label="Assign to Folder" options={allFoldersData} />

      <RFTextField
        label="Description"
        register={register('description')}
        error={errors.description?.message as string}
      />

      <div className="flex justify-end">
        <Button type="submit" text="Update" />
      </div>
    </form>
  );
};

export default EditSection;

// this dummy data should be removed after the integration
const allFoldersData = [
  {
    label: 'Folder1',
    value: 'Folder1'
  },
  {
    label: 'Folder2',
    value: 'Folder2'
  }
];

const allCategoryData = [
  {
    label: 'Category1',
    value: 'Category1'
  },
  {
    label: 'Category2',
    value: 'Category2'
  }
];
