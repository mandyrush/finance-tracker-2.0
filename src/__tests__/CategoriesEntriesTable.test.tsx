import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CategoryEntriesTable from '@/components/organisms/category-entries-table/CategoryEntriesTable';
import { budgetEntries } from './data/budgetEntries';
import { Theme } from '@radix-ui/themes';

const setup = () => {
  render(
    <MemoryRouter>
      <Theme>
        <CategoryEntriesTable tableData={budgetEntries} />
      </Theme>
    </MemoryRouter>
  );
};

test('renders table', () => {
  setup();
  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('renders table headers', () => {
  setup();
  expect(
    screen.getByRole('columnheader', { name: 'Item' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('columnheader', { name: 'Amount' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('columnheader', { name: 'Actions' })
  ).toBeInTheDocument();
});

test('renders table rows', () => {
  setup();
  expect(screen.getAllByRole('row')).toHaveLength(13);
});

test('renders table row totals', () => {
  setup();
  expect(screen.getAllByRole('rowheader', { name: 'Total' })).toHaveLength(3);
});

test('renders table row total amount', () => {
  setup();
  expect(
    screen.getAllByRole('rowheader', { name: 'Grand Total' })
  ).toHaveLength(1);
});
