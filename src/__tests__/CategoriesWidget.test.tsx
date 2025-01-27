import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CategoriesWidget from '../components/organisms/categories-widget/CategoriesWidget';
import { budgetEntries } from './data/budgetEntries';
import strings from '@/locals/en';

const {
  budget: { budget },
} = strings;

const setup = () => {
  render(
    <MemoryRouter>
      <CategoriesWidget title={budget} entries={budgetEntries} />
    </MemoryRouter>
  );
};

test('renders widget title', () => {
  setup();
  expect(screen.getByText(budget)).toBeInTheDocument();
});

test('renders widget entries', () => {
  setup();
  expect(budgetEntries.length).toBe(5);

  const carTotal = screen.getByRole('heading', { name: 'Car $490.00' });
  expect(carTotal).toBeInTheDocument();

  const technologyTotal = screen.getByRole('heading', {
    name: 'Technology $75.00',
  });
  expect(technologyTotal).toBeInTheDocument();

  const homeTotal = screen.getByRole('heading', { name: 'Home $150.00' });
  expect(homeTotal).toBeInTheDocument();
});

test('renders total of all categories', () => {
  setup();
  const categoryTotals = screen.getByRole('heading', { name: 'Total $715.00' });
  expect(categoryTotals).toBeInTheDocument();
});
