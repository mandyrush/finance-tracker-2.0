import { useState } from 'react';
import { Entry } from '@/models/entry';
import { capitalizeFirstLetter, formatToCurrency } from '@/utilities/helpers';
import strings from '@/locals/en';
import EditBudgetEntryDialog from '../edit-budget-entry-dialog/EditBudgetEntryDialog';
import DeleteBudgetEntryDialog from '../delete-budget-entry-dialog/DeleteBudgetEntryDialog';
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
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<number | undefined>();

  const handleEditOpenChange = () => {
    if (showEditDialog) {
      setShowEditDialog(false);
      setSelectedEntryId(undefined);
    } else {
      setShowEditDialog(true);
    }
  };

  const handleDeleteOpenChange = () => {
    if (showDeleteDialog) {
      setShowDeleteDialog(false);
      setSelectedEntryId(undefined);
    } else {
      setShowDeleteDialog(true);
    }
  };

  const handleEdit = (id: number) => {
    setSelectedEntryId(id);
    setShowEditDialog(true);
  };

  const handleConfirmDelete = (id: number) => {
    setSelectedEntryId(id);
    setShowDeleteDialog(true);
  };

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
                <DropdownMenu.Item onClick={() => handleEdit(id)}>
                  {edit}
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => handleConfirmDelete(id)}>
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

      {/* @TODO - add error dialog if the selectedEntryId is not found */}
      {!selectedEntryId ? null : (
        <>
          <DeleteBudgetEntryDialog
            show={showDeleteDialog}
            handleOpenChange={handleDeleteOpenChange}
            selectedId={selectedEntryId}
          />

          <EditBudgetEntryDialog
            show={showEditDialog}
            handleOpenChange={handleEditOpenChange}
            selectedId={selectedEntryId}
          />
        </>
      )}
    </>
  );
};

export default CategoryEntryRows;
