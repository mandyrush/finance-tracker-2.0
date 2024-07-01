import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import {
  useGetPaymentMethodsQuery,
  useCreatePaymentMethodMutation,
} from '@/services/base';
import FormLabel from '@/components/atoms/form-label/FormLabel';
import { FormError } from '@/components/atoms/form-label/styles';
import AlertCallout from '@components/atoms/alert-callout/AlertCallout';
import { Card, Heading, Flex, TextField, Button } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import strings from '@/locals/en';

const {
  global: { paymentMethod, save },
  budget: {
    addPaymentMethod,
    callouts: { createPaymentMethodFailure, createPaymentMethodSuccess },
    validation: {
      mustBeThirtyCharacters,
      paymentMethodExists,
      paymentMethodRequired,
    },
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

  const validationSchema = object({
    category: string()
      .max(30, mustBeThirtyCharacters)
      .required(paymentMethodRequired)
      .test(
        'is unique',
        paymentMethodExists,
        (value) =>
          existingPaymentMethods.findIndex(
            (method) => method.paymentMethod === value
          ) === -1
      ),
  });

  return (
    <Card>
      <Heading as="h2" size="3">
        {addPaymentMethod}
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
              <Flex direction="column" gap="1">
                <FormLabel labelFor="paymentMethod">{paymentMethod}</FormLabel>
                <TextField.Root
                  placeholder={paymentMethod}
                  radius="large"
                  id="paymentMethod"
                  name="paymentMethod"
                  type="text"
                  value={values.paymentMethod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.paymentMethod && errors.paymentMethod ? (
                  <FormError>{errors.paymentMethod}</FormError>
                ) : null}
              </Flex>
              <Button
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
