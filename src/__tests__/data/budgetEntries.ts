import { Entry, EntryType, EntryFrequency } from '@/models/entry';

export const budgetEntries: Entry[] = [
  {
    id: 2001,
    name: 'Car',
    amount: '150.00',
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
  {
    id: 2002,
    name: 'Car Payment',
    amount: '340.00',
    category: {
      id: 100,
      name: 'Car',
    },
    entryType: EntryType.Budget,
    frequency: EntryFrequency.Monthly,
    dueDate: '21st',
    paymentMethod: {
      id: 700,
      name: 'CC 2222',
    },
  },
  {
    id: 2003,
    name: 'Internet',
    amount: '75.00',
    category: {
      id: 200,
      name: 'Technology',
    },
    entryType: EntryType.Budget,
    frequency: EntryFrequency.Monthly,
    dueDate: '3rd',
    paymentMethod: {
      id: 800,
      name: 'Checking 5555',
    },
  },
  {
    id: 2004,
    name: 'Water',
    amount: '70.00',
    category: {
      id: 300,
      name: 'Home',
    },
    entryType: EntryType.Budget,
    frequency: EntryFrequency.Monthly,
    dueDate: '5th',
    paymentMethod: {
      id: 800,
      name: 'Checking 5555',
    },
  },
  {
    id: 2005,
    name: 'Electric',
    amount: '80.00',
    category: {
      id: 300,
      name: 'Home',
    },
    entryType: EntryType.Budget,
    frequency: EntryFrequency.Monthly,
    dueDate: '31st',
    paymentMethod: {
      id: 800,
      name: 'Checking 5555',
    },
  },
];
