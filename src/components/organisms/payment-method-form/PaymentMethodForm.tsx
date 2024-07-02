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
  global: { paymentMethod, save },
  budget: {
    addPaymentMethod,
    callouts: { createPaymentMethodFailure, createPaymentMethodSuccess },
  },
} = strings;

interface FormValues {
  paymentMethod: string;
}

const PaymentMethodForm = () => {
  const { data: existingPaymentMethods = [] } = useGetPaymentMethodsQuery();
  const [createPaymentMethod, { isLoading }] = useCreatePaymentMethodMutation();

  const initialValues: FormValues = {
    paymentMethod: '',
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
            await createPaymentMethod(values);
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
                name="paymentMethod"
                label={paymentMethod}
                type="text"
                value={values.paymentMethod}
                onChange={handleChange}
                onBlur={handleBlur}
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

export default PaymentMethodForm;
