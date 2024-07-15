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

export const categoryValidationSchema = (existingCategories: Category[]) => {
  return object({
    categoryName: string()
      .max(30, mustBeThirtyCharacters)
      .required(categoryRequired)
      .test(
        'is unique',
        categoryExists,
        (categoryName) =>
          existingCategories.findIndex(
            (category) => category.name === categoryName
          ) === -1
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
    methodName: string()
      .max(30, mustBeThirtyCharacters)
      .required(paymentMethodRequired)
      .test(
        'is unique',
        paymentMethodExists,
        (paymentMethod) =>
          existingPaymentMethods.findIndex(
            (method) => method.name === paymentMethod
          ) === -1
      ),
  });
};
