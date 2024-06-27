import { useCallback, useMemo } from 'react';
import { Entry } from '@/models/entry';
import { formatToCurrency } from '@/utilities/helpers';
import CategoryEntryRows from '@/components/molecules/category-entry-rows/CategoryEntryRows';
import { Table, Strong } from '@radix-ui/themes';
import strings from '@/locals/en';
import { RowTotal } from './styles';

const {
  global: { actions, amount, grandTotal },
  budget: { item },
} = strings;

interface CategoryEntriesTableProps {
  tableData: Entry[];
}

const CategoryEntriesTable = ({ tableData }: CategoryEntriesTableProps) => {
  const categoryEntries = useCallback(
    (category: string) => {
      return tableData.filter((entry) => entry.category === category);
    },
    [tableData]
  );

  const sumEntries = useCallback((entries: Entry[]) => {
    const total = entries?.reduce(
      (accumulator, current) => accumulator + current.amount,
      0
    );
    return formatToCurrency(total);
  }, []);

  const sortEntries = useCallback((entries: Entry[]) => {
    return entries.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }, []);

  const categoryArray = useMemo(() => {
    return tableData?.map?.(({ category }) => category);
  }, [tableData]);

  const categories = useMemo(() => {
    return Array.from(new Set(categoryArray));
  }, [categoryArray]);

  const sortedCategories = useMemo(() => {
    return categories.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  }, [categories]);

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>{item}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{amount}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{actions}</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedCategories.map((category) => (
          <CategoryEntryRows
            key={category}
            category={category}
            entries={sortEntries(categoryEntries(category))}
            entriesTotal={sumEntries(categoryEntries(category))}
          />
        ))}

        <RowTotal>
          <Table.RowHeaderCell>
            <Strong>{grandTotal}</Strong>
          </Table.RowHeaderCell>
          <Table.Cell justify="end">
            <Strong>{sumEntries(tableData)}</Strong>
          </Table.Cell>
          <Table.Cell />
        </RowTotal>
      </Table.Body>
    </Table.Root>
  );
};

export default CategoryEntriesTable;
