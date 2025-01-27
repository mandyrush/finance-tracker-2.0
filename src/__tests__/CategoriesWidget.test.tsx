import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CategoriesWidget from '../components/organisms/categories-widget/CategoriesWidget';
import { Entry, EntryType, EntryFrequency } from '../models/entry';

const widgetTitle = 'Budget';
const budgetEntries: Entry[] = [
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

const setup = () => {
  render(
    <MemoryRouter>
      <CategoriesWidget title={widgetTitle} entries={budgetEntries} />
    </MemoryRouter>
  );
};

test('renders widget title', () => {
  setup();
  expect(screen.getByText(widgetTitle)).toBeInTheDocument();
});

test('renders widget entries', () => {
  setup();
  expect(budgetEntries.length).toBe(5);

  const carTotal = screen.getByRole('heading', { name: 'Car $490' });
  expect(carTotal).toBeInTheDocument();

  const technologyTotal = screen.getByRole('heading', {
    name: 'Technology $75',
  });
  expect(technologyTotal).toBeInTheDocument();

  const homeTotal = screen.getByRole('heading', { name: 'Home $150' });
  expect(homeTotal).toBeInTheDocument();
});

test('renders total of all categories', () => {
  setup();
  const categoryTotals = screen.getByRole('heading', { name: 'Total $715' });
  expect(categoryTotals).toBeInTheDocument();
});
