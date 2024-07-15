import { Formik, Form } from 'formik';
import { paymentMethodValidationSchema } from '@/models/validationSchema';
import {
  useGetPaymentMethodsQuery,
  useCreatePaymentMethodMutation,
} from '@/services/base';
import TextInput from '@/components/molecules/text-input/TextInput';
import AlertCallout from '@components/atoms/alert-callout/AlertCallout';
import { Card, Heading, Flex, Button } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import strings from '@/locals/en';

const {
  global: { name, save },
  budget: {
    addPaymentMethod,
    callouts: { createPaymentMethodFailure, createPaymentMethodSuccess },
  },
} = strings;

interface FormValues {
  methodName: string;
}

const PaymentMethodForm = () => {
  const { data: existingPaymentMethods = [] } = useGetPaymentMethodsQuery();
  const [createPaymentMethod, { isLoading }] = useCreatePaymentMethodMutation();

  const initialValues: FormValues = {
    methodName: '',
  };

  return (
    <Card>
      <Heading as="h2" size="3">
        {addPaymentMethod}
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={paymentMethodValidationSchema(existingPaymentMethods)}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createPaymentMethod({ name: values.methodName });
            <AlertCallout
              message={createPaymentMethodSuccess}
              icon={<InfoCircledIcon />}
            />;
            resetForm();
          } catch (e) {
            <AlertCallout message={createPaymentMethodFailure} />;
          }
        }}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <Flex direction="column" gap="3" maxWidth="300px">
              <TextInput
                name="methodName"
                label={name}
                type="text"
                value={values.methodName}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!touched.methodName && !!errors.methodName}
                error={errors.methodName || ''}
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

export default PaymentMethodForm;
