import { useMemo } from 'react';
import { Formik, Form } from 'formik';
import { EntryFrequency } from '@/models/entry';
import { expenseFormValidationSchema } from '@/models/validationSchema';
import {
  useGetBudgetCategoriesQuery,
  useGetPaymentMethodsQuery,
  useCreateBudgetEntryMutation,
} from '@/services/base';
import TextInput from '@/components/molecules/text-input/TextInput';
import SelectInput from '@/components/molecules/select-input/SelectInput';
import AlertCallout from '@components/atoms/alert-callout/AlertCallout';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Card, Heading, Flex, Button } from '@radix-ui/themes';
import strings from '@/locals/en';

const {
  global: {
    amount,
    category,
    dueDate,
    frequency,
    name,
    paymentMethod,
    save,
    select,
  },
  budget: {
    addExpense,
    callouts: { createBudgetEntryFailure, createBudgetEntrySuccess },
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

  const {
    data: paymentMethods = [],
    // error: isGetPaymentMethodsError,
    isLoading: isPaymentMethodsLoading,
  } = useGetPaymentMethodsQuery();

  const [createEntry, { isLoading }] = useCreateBudgetEntryMutation();

  const categoryOptions = useMemo(() => {
    return categories.map((category) => {
      return {
        label: category.name,
        value: category.id.toString(),
      };
    });
  }, [categories]);

  const frequencyOptions = Object.entries(EntryFrequency).map(
    ([key, value]) => ({ label: key, value: value.toLowerCase() })
  );

  const paymentMethodOptions = useMemo(() => {
    return paymentMethods.map((method) => {
      return {
        label: method.name,
        value: method.id.toString(),
      };
    });
  }, [paymentMethods]);

  const sortedCategories = useMemo(() => {
    return [...categoryOptions]?.sort((a, b) =>
      a.label.toLowerCase().localeCompare(b.label.toLowerCase())
    );
  }, [categoryOptions]);

  const sortedPaymentMethods = useMemo(() => {
    return [...paymentMethodOptions]?.sort((a, b) =>
      a.label.toLowerCase().localeCompare(b.label.toLowerCase())
    );
  }, [paymentMethodOptions]);

  const initialValues: FormValues = {
    name: '',
    amount: 0.0,
    category: '',
    frequency: EntryFrequency.Monthly,
    dueDate: '',
    paymentMethod: '',
  };

  return (
    <Card>
      <Heading as="h2" size="3">
        {addExpense}
      </Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={expenseFormValidationSchema}
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
              <TextInput
                name="name"
                label={name}
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!touched.name && !!errors.name}
                error={errors.name || ''}
              />

              <TextInput
                name="amount"
                label={amount}
                type="number"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!touched.amount && !!errors.amount}
                error={errors.amount || ''}
              />

              <SelectInput
                name="category"
                label={category}
                value={values.category}
                onValueChange={(value: string) => {
                  setFieldValue('category', value, true);
                }}
                placeholder={select}
                isLoading={isCategoriesLoading}
                options={sortedCategories}
                hasError={!!touched.category && !!errors.category}
                error={errors.category || ''}
              />

              <SelectInput
                name="frequency"
                label={frequency}
                value={values.frequency}
                onValueChange={(value: string) => {
                  setFieldValue('frequency', value, true);
                }}
                placeholder={select}
                options={frequencyOptions}
                hasError={!!touched.frequency && !!errors.frequency}
                error={errors.frequency || ''}
              />

              <TextInput
                name="dueDate"
                label={dueDate}
                type="text"
                value={values.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!touched.dueDate && !!errors.dueDate}
                error={errors.dueDate || ''}
              />

              <SelectInput
                name="paymentMethod"
                label={paymentMethod}
                value={values.paymentMethod}
                onValueChange={(value: string) => {
                  setFieldValue('paymentMethod', value, true);
                }}
                placeholder={select}
                isLoading={isPaymentMethodsLoading}
                options={sortedPaymentMethods}
                hasError={!!touched.paymentMethod && !!errors.paymentMethod}
                error={errors.paymentMethod || ''}
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

export default ExpenseForm;
