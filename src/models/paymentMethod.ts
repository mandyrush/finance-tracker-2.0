export enum PaymentMethodsApiTag {
  PaymentMethods = 'PaymentMethods',
}

export interface PaymentMethod {
  id: number;
  paymentMethod: string;
}
