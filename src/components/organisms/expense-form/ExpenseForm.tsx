import { useMemo } from 'react';
import { Formik, Form } from 'formik';
import { object, string, number } from 'yup';
import { EntryFrequency } from '@/models/entry';
import {
  useGetBudgetCategoriesQuery,
  useCreateBudgetEntryMutation,
} from '@/services/base';
import FormLabel from '@/components/atoms/form-label/FormLabel';
import { FormError } from '@/components/atoms/form-label/styles';
import AlertCallout from '@components/atoms/alert-callout/AlertCallout';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Card,
  Heading,
  Flex,
  TextField,
  Select,
  Button,
  Text,
} from '@radix-ui/themes';
import strings from '@/locals/en';

const {
  global: {
    amount,
    category,
    dueDate,
    frequency,
    loading,
    name,
    paymentMethod,
    save,
  },
  budget: {
    addExpense,
    callouts: { createBudgetEntryFailure, createBudgetEntrySuccess },
    validation: {
      enterAnAmount,
      enterDueDate,
      mustBeANumber,
      mustBeThirtyCharacters,
      nameRequired,
      selectCategory,
      selectFrequency,
      selectPaymentMethod,
    },
  },
} = strings;

interface FormValues {
  name: string;
  amount: number;
  category: string;
  frequency: EntryFrequency;
  dueDate: string;
  paymentMethod: string;
}

const ExpenseForm = () => {
  const {
    data: categories = [],
    // error: isGetCategoriesError,
    isLoading: isCategoriesLoading,
  } = useGetBudgetCategoriesQuery();
  const [createEntry, { isLoading }] = useCreateBudgetEntryMutation();

  const sortedCategories = useMemo(() => {
    return [...categories]?.sort((a, b) =>
      a.category.toLowerCase().localeCompare(b.category.toLowerCase())
    );
  }, [categories]);

  const initialValues: FormValues = {
    name: '',
    amount: 0.0,
    category: '',
    frequency: EntryFrequency.Monthly,
    dueDate: '',
    paymentMethod: '',
  };

  const validationSchema = object({
    name: string().max(30, mustBeThirtyCharacters).required(nameRequired),
    amount: number().typeError(mustBeANumber).required(enterAnAmount),
    category: string().required(selectCategory),
    frequency: string().required(selectFrequency),
    dueDate: string().required(enterDueDate),
    paymentMethod: string().required(selectPaymentMethod),
  });

  return (
    <Card>
      <Heading as="h2" size="3">
        {addExpense}
      </Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createEntry(values);
            <AlertCallout
              message={createBudgetEntrySuccess}
              icon={<InfoCircledIcon />}
            />;
            resetForm();
          } catch (e) {
            <AlertCallout message={createBudgetEntryFailure} />;
          }
        }}
      >
        {({
          values,
          touched,
          errors,
          setFieldValue,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <Flex direction="column" gap="3" maxWidth="300px">
              <Flex direction="column" gap="1">
                <FormLabel labelFor="name">{name}</FormLabel>
                <TextField.Root
                  radius="large"
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name ? (
                  <FormError>{errors.name}</FormError>
                ) : null}
              </Flex>

              <Flex direction="column" gap="1">
                <FormLabel labelFor="amount">{amount}</FormLabel>
                <TextField.Root
                  radius="large"
                  id="amount"
                  name="amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.amount && errors.amount ? (
                  <FormError>{errors.amount}</FormError>
                ) : null}
              </Flex>

              <Flex direction="column" gap="1">
                <FormLabel labelFor="category">{category}</FormLabel>
                <Select.Root
                  size="2"
                  name="category"
                  value={values.category}
                  onValueChange={(value) => {
                    setFieldValue('category', value, true);
                  }}
                >
                  <Select.Trigger radius="large" placeholder="Select" />
                  <Select.Content>
                    {isCategoriesLoading ? (
                      <Select.Item value="loading">
                        <Text>{loading}...</Text>
                      </Select.Item>
                    ) : (
                      sortedCategories?.map(({ id, category }) => (
                        <Select.Item key={id} value={category.toLowerCase()}>
                          {category}
                        </Select.Item>
                      ))
                    )}
                  </Select.Content>
                </Select.Root>
                {touched.category && errors.category ? (
                  <FormError>{errors.category}</FormError>
                ) : null}
              </Flex>

              <Flex direction="column" gap="1">
                <FormLabel labelFor="frequency">{frequency}</FormLabel>
                <Select.Root
                  size="2"
                  name="frequency"
                  value={values.frequency}
                  onValueChange={(value) => {
                    setFieldValue('frequency', value, true);
                  }}
                >
                  <Select.Trigger radius="large" placeholder="Select" />
                  <Select.Content>
                    <Select.Item value="monthly">Monthly</Select.Item>
                    <Select.Item value="semi-annual">Semi-Annual</Select.Item>
                    <Select.Item value="yearly">Yearly</Select.Item>
                  </Select.Content>
                </Select.Root>
                {touched.frequency && errors.frequency ? (
                  <FormError>{errors.frequency}</FormError>
                ) : null}
              </Flex>

              <Flex direction="column" gap="1">
                <FormLabel labelFor="dueDate">{dueDate}</FormLabel>
                <TextField.Root
                  radius="large"
                  id="dueDate"
                  name="dueDate"
                  type="text"
                  value={values.dueDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.dueDate && errors.dueDate ? (
                  <FormError>{errors.dueDate}</FormError>
                ) : null}
              </Flex>

              <Flex direction="column" gap="1">
                <FormLabel labelFor="paymentMethod">{paymentMethod}</FormLabel>
                <Select.Root
                  size="2"
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onValueChange={(value) => {
                    setFieldValue('paymentMethod', value, true);
                  }}
                >
                  <Select.Trigger radius="large" placeholder="Select" />
                  <Select.Content>
                    <Select.Item value="cc-1111">CC - 1111</Select.Item>
                    <Select.Item value="cc-2222">CC - 2222</Select.Item>
                    <Select.Item value="cc-3333">CC - 3333</Select.Item>
                  </Select.Content>
                </Select.Root>
                {touched.paymentMethod && errors.paymentMethod ? (
                  <FormError>{errors.paymentMethod}</FormError>
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

export default ExpenseForm;
