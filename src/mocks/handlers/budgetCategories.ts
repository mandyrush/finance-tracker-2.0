import { http, HttpResponse } from 'msw';
import { budgetCategories } from '../data/budgetCategories';

const allCategories = new Map(budgetCategories);

export const handlers = [
  http.get('/budget-categories', () => {
    return HttpResponse.json(Array.from(allCategories.values()));
  }),
  http.post('/budget-categories', async ({ request }) => {
    const categoryData = (await request.json()) as { name: string };
    const id = Math.floor(Math.random() * 1000);
    const newCategory = { id, ...categoryData };
    allCategories.set(id, newCategory);
    return HttpResponse.json(newCategory, { status: 201 });
  }),
  http.delete('/budget-categories/:id', ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params;
    const deletedCategory = allCategories.get(Number(id));

    if (!deletedCategory) {
      return new HttpResponse(null, { status: 404 });
    }

    allCategories.delete(Number(id));
    return HttpResponse.json(deletedCategory);
  }),
];
