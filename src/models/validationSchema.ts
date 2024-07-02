import { object, string, number } from 'yup';
import { Category } from './category';
import { PaymentMethod } from './paymentMethod';
import strings from '@/locals/en';

const {
  budget: {
    validation: {
      categoryExists,
      categoryRequired,
      enterAnAmount,
      enterDueDate,
      mustBeANumber,
      mustBeThirtyCharacters,
      nameRequired,
      paymentMethodExists,
      paymentMethodRequired,
      selectCategory,
      selectFrequency,
      selectPaymentMethod,
    },
  },
} = strings;

export const categoryFormvalidationSchema = (
  existingCategories: Category[]
) => {
  return object({
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
};

export const expenseFormValidationSchema = object({
  name: string().max(30, mustBeThirtyCharacters).required(nameRequired),
  amount: number().typeError(mustBeANumber).required(enterAnAmount),
  category: string().required(selectCategory),
  frequency: string().required(selectFrequency),
  dueDate: string().required(enterDueDate),
  paymentMethod: string().required(selectPaymentMethod),
});

export const paymentMethodValidationSchema = (
  existingPaymentMethods: PaymentMethod[]
) => {
  return object({
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
};
