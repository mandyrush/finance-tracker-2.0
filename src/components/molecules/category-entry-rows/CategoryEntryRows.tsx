import { Entry } from '@/models/entry';
import { capitalizeFirstLetter, formatToCurrency } from '@/utilities/helpers';
import strings from '@/locals/en';
import {
  Table,
  Strong,
  DropdownMenu,
  IconButton,
  Flex,
} from '@radix-ui/themes';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { RowHeader } from './styles';

const {
  global: { delete: deleteButton, edit, total },
} = strings;

interface CategoryEntryRowsProps {
  category: string;
  entries: Entry[];
  entriesTotal: string;
}

const CategoryEntryRows = ({
  category,
  entries,
  entriesTotal,
}: CategoryEntryRowsProps) => {
  return (
    <>
      <Table.Row>
        <RowHeader colSpan={3}>
          <Strong>{capitalizeFirstLetter(category)}</Strong>
        </RowHeader>
      </Table.Row>

      {entries?.map(({ id, name, amount }) => (
        <Table.Row key={id}>
          <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
          <Table.Cell justify="end">{formatToCurrency(amount)}</Table.Cell>
          <Table.Cell justify="center">
            <DropdownMenu.Root>
              <Flex height="100%" align="center" justify="center">
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost">
                    <DotsHorizontalIcon />
                  </IconButton>
                </DropdownMenu.Trigger>
              </Flex>
              <DropdownMenu.Content>
                <DropdownMenu.Item onClick={() => {}}>{edit}</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => {}}>
                  {deleteButton}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Table.Cell>
        </Table.Row>
      ))}

      <Table.Row>
        <Table.RowHeaderCell>
          <Strong>{total}</Strong>
        </Table.RowHeaderCell>
        <Table.Cell justify="end">
          <Strong>{entriesTotal}</Strong>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default CategoryEntryRows;
