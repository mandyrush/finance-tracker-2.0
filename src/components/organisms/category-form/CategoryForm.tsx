import { Formik, Form } from 'formik';
import { categoryFormvalidationSchema } from '@/models/validationSchema';
import {
  useCreateBudgetCategoryMutation,
  useGetBudgetCategoriesQuery,
} from '@/services/base';
import TextInput from '@/components/molecules/text-input/TextInput';
import AlertCallout from '@components/atoms/alert-callout/AlertCallout';
import { Card, Heading, Flex, Button } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import strings from '@/locals/en';

const {
  global: { save, category },
  budget: {
    addCategory,
    callouts: { createCategoryFailure, createCategorySuccess },
  },
} = strings;

interface FormValues {
  category: string;
}

const CategoryForm = () => {
  const { data: existingCategories = [] } = useGetBudgetCategoriesQuery();
  const [createCategory, { isLoading }] = useCreateBudgetCategoryMutation();

  const initialValues: FormValues = {
    category: '',
  };

  return (
    <Card>
      <Heading as="h2" size="3">
        {addCategory}
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={categoryFormvalidationSchema(existingCategories)}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createCategory(values);
            <AlertCallout
              message={createCategorySuccess}
              icon={<InfoCircledIcon />}
            />;
            resetForm();
          } catch (e) {
            <AlertCallout message={createCategoryFailure} />;
          }
        }}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <Flex direction="column" gap="3" maxWidth="300px">
              <TextInput
                name="category"
                label={category}
                type="text"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!touched.category && !!errors.category}
                error={errors.category || ''}
              />

              <Button
                type="submit"
                variant="solid"
                radius="large"
                color="grass"
                loading={isLoading}
              >
                {save}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CategoryForm;
