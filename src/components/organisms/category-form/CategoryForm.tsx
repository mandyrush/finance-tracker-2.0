import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import {
  useCreateBudgetCategoryMutation,
  useGetBudgetCategoriesQuery,
} from '@/services/base';
import FormLabel from '@/components/atoms/form-label/FormLabel';
import { FormError } from '@/components/atoms/form-label/styles';
import AlertCallout from '@components/atoms/alert-callout/AlertCallout';
import { Card, Heading, Flex, TextField, Button } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import strings from '@/locals/en';

const {
  global: { save, category },
  budget: {
    addCategory,
    callouts: { createCategoryFailure, createCategorySuccess },
    validation: { categoryExists, categoryRequired, mustBeThirtyCharacters },
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

  const validationSchema = object({
    category: string()
      .max(30, mustBeThirtyCharacters)
      .required(categoryRequired)
      .test(
        'is unique',
        categoryExists,
        (value) =>
          existingCategories.findIndex((cat) => cat.category === value) === -1
      ),
  });

  return (
    <Card>
      <Heading as="h2" size="3">
        {addCategory}
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
              <Flex direction="column" gap="1">
                <FormLabel labelFor="category">{category}</FormLabel>
                <TextField.Root
                  placeholder={category}
                  radius="large"
                  id="category"
                  name="category"
                  type="text"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.category && errors.category ? (
                  <FormError>{errors.category}</FormError>
                ) : null}
              </Flex>
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
