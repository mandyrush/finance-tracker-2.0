import { http, HttpResponse } from 'msw';
import { EntryType, EntryFrequency } from '@/models/entry';
import { budgetEntries } from '../data/budgetEntries';

interface budgetEntryProps {
  name: string;
  amount: number;
  category: string;
  frequency: EntryFrequency;
  dueDate: string;
  paymentMethod: string;
  entryType: EntryType;
}

const allEntries = new Map(budgetEntries);

export const handlers = [
  http.get('/budget-entries', () => {
    return HttpResponse.json(Array.from(allEntries.values()));
  }),
  http.post('/budget-entries', async ({ request }) => {
    const entryData = (await request.json()) as budgetEntryProps;
    const id = Math.floor(Math.random() * 1000);
    const categoryEntryId =
      [...allEntries].find(
        ([, value]) => value.category.name === entryData.category
      )?.[0] || -1;
    const paymentMethodEntryId =
      [...allEntries].find(
        ([, value]) => value.paymentMethod.name === entryData.paymentMethod
      )?.[0] || -1;
    const category = {
      id: allEntries.get(categoryEntryId)?.category.id || -1,
      name: entryData?.category,
    };
    const paymentMethod = {
      id: allEntries.get(paymentMethodEntryId)?.paymentMethod.id || -1,
      name: entryData?.paymentMethod,
    };
    const newEntry = {
      ...entryData,
      id,
      category,
      paymentMethod,
    };
    allEntries.set(id, newEntry);
    return HttpResponse.json(newEntry, { status: 201 });
  }),
  http.delete('/budget-entries/:id', ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params;
    const deletedEntry = allEntries.get(Number(id));

    if (!deletedEntry) {
      return new HttpResponse(null, { status: 404 });
    }

    allEntries.delete(Number(id));
    return HttpResponse.json(deletedEntry);
  }),
];
