import { http, HttpResponse } from 'msw';
import { paymentMethods } from '@/mocks/data/paymentMethods';

const allPaymentMethods = new Map(paymentMethods);

export const handlers = [
  http.get('/payment-methods', () => {
    return HttpResponse.json(Array.from(allPaymentMethods.values()));
  }),
  http.post('/payment-methods', async ({ request }) => {
    const methodData = await request.json();
    const id = Math.floor(Math.random() * 1000);
    const newMethod = { id, ...methodData };
    allPaymentMethods.set(id, newMethod);
    return HttpResponse.json(newMethod, { status: 201 });
  }),
  http.delete('/payment-methods/:id', ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params;
    const deletedMethod = allPaymentMethods.get(id);

    if (!deletedMethod) {
      return new HttpResponse(null, { status: 404 });
    }

    allPaymentMethods.delete(id);
    return HttpResponse.json(deletedMethod);
  }),
];
