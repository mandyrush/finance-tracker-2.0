import { http, HttpResponse } from 'msw';
import { EntryType, EntryFrequency } from '@/models/entry';
import { budgetEntries } from '../data/budgetEntries';

interface budgetEntryProps {
  name: string;
  amount: string;
  category: string;
  frequency: EntryFrequency;
  dueDate: string;
  paymentMethod: string;
  entryType: EntryType;
}

const allEntries = new Map(budgetEntries);

const getCategoryData = (category: string) => {
  const categoryEntryId =
    [...allEntries].find(
      ([, value]) => value.category.name === category
    )?.[0] || -1;
  return {
    id: allEntries.get(categoryEntryId)?.category.id || -1,
    name: category,
  };
};

const getPaymentMethodData = (paymentMethod: string) => {
  const paymentMethodEntryId =
    [...allEntries].find(
      ([, value]) => value.paymentMethod.name === paymentMethod
    )?.[0] || -1;
  return {
    id: allEntries.get(paymentMethodEntryId)?.paymentMethod.id || -1,
    name: paymentMethod,
  };
};

export const handlers = [
  http.get('/budget-entries', () => {
    return HttpResponse.json(Array.from(allEntries.values()));
  }),
  http.get('/budget-entries/:id', ({ params }) => {
    const { id } = params;
    const entry = allEntries.get(Number(id));

    if (!entry) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(entry);
  }),
  http.post('/budget-entries', async ({ request }) => {
    const entryData = (await request.json()) as budgetEntryProps;
    const id = Math.floor(Math.random() * 1000);

    const category = getCategoryData(entryData.category);
    const paymentMethod = getPaymentMethodData(entryData.paymentMethod);

    const newEntry = {
      ...entryData,
      id,
      category,
      paymentMethod,
    };
    allEntries.set(id, newEntry);
    return HttpResponse.json(newEntry, { status: 201 });
  }),
  http.put('/budget-entries/:id', async ({ params, request }) => {
    const { id } = params;
    const entryData = (await request.json()) as budgetEntryProps;
    const existingEntry = allEntries.get(Number(id));

    const category = getCategoryData(entryData.category);
    const paymentMethod = getPaymentMethodData(entryData.paymentMethod);

    if (!existingEntry) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedEntry = {
      ...existingEntry,
      ...entryData,
      category,
      paymentMethod,
    };

    allEntries.set(Number(id), updatedEntry);
    return HttpResponse.json(updatedEntry);
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
