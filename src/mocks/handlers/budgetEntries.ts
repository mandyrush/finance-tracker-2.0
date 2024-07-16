import { http, HttpResponse } from 'msw';
import { EntryType, EntryFrequency } from '@/models/entry';

interface budgetEntryProps {
  name: string;
  amount: number;
  category: string;
  frequency: EntryFrequency;
  dueDate: string;
  paymentMethod: string;
  entryType: EntryType;
}

const allEntries = new Map([
  [
    2001,
    {
      id: 2001,
      name: 'Car Insurance',
      amount: 150.0,
      category: {
        id: 100,
        name: 'Car',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '1st',
      paymentMethod: {
        id: 600,
        name: 'CC 1111',
      },
    },
  ],
  [
    2002,
    {
      id: 2002,
      name: 'Truck Loan',
      amount: 345.72,
      category: {
        id: 100,
        name: 'Car',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '30th',
      paymentMethod: {
        id: 800,
        name: 'Checking 5555',
      },
    },
  ],
  [
    2003,
    {
      id: 2003,
      name: 'Internet',
      amount: 75.0,
      category: {
        id: 200,
        name: 'Technology',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '3rd',
      paymentMethod: {
        id: 700,
        name: 'CC 2222',
      },
    },
  ],
  [
    2005,
    {
      id: 2005,
      name: 'Northwestern Energy',
      amount: 70.0,
      category: {
        id: 300,
        name: 'Home',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '20st',
      paymentMethod: {
        id: 800,
        name: 'Checking 5555',
      },
    },
  ],
  [
    2006,
    {
      id: 2006,
      name: 'Mortgage',
      amount: 1623.29,
      category: {
        id: 300,
        name: 'Home',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '1st',
      paymentMethod: {
        id: 800,
        name: 'Checking 5555',
      },
    },
  ],
]);

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
