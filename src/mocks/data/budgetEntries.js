import { EntryType, EntryFrequency } from '@/models/entry';

export const budgetEntries = [
  [
    2001,
    {
      id: 2001,
      name: 'Car Insurance',
      amount: 150.0,
      category: {
        id: 100,
        name: 'car',
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
        name: 'car',
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
        name: 'technology',
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
    2004,
    {
      id: 2004,
      name: 'Public Utilities',
      amount: 70.0,
      category: {
        id: 300,
        name: 'home',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '30th',
      paymentMethod: {
        id: 600,
        name: 'CC 1111',
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
        name: 'home',
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
        name: 'home',
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
  [
    2007,
    {
      id: 2007,
      name: 'MDU',
      amount: 95.0,
      category: {
        id: 300,
        name: 'home',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '27th',
      paymentMethod: {
        id: 800,
        name: 'Checking 5555',
      },
    },
  ],
  [
    2008,
    {
      id: 2008,
      name: 'Gas',
      amount: 100.0,
      category: {
        id: 100,
        name: 'car',
      },
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: '30th',
      paymentMethod: {
        id: 600,
        name: 'CC 1111',
      },
    },
  ],
];
