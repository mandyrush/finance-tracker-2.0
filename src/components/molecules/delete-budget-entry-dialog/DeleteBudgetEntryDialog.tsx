import { Dialog, Button, Flex } from '@radix-ui/themes';
import { useDeleteBudgetEntryMutation } from '@/services/base';
import strings from '@/locals/en';

const {
  global: { delete: deleteText, cancel },
  budget: {
    actions: { deleteEntryConfirmation },
  },
} = strings;

interface DeleteBudgetEntryDialogProps {
  show: boolean;
  handleOpenChange: () => void;
  selectedId?: number;
}

const DeleteBudgetEntryDialog = ({
  show,
  handleOpenChange,
  selectedId,
}: DeleteBudgetEntryDialogProps) => {
  const [deleteEntry, { isLoading }] = useDeleteBudgetEntryMutation();

  const handleDeleteEntry = async () => {
    if (!selectedId) return;
    try {
      await deleteEntry({ id: selectedId });
      // @TODO - show success toast
    } catch (error) {
      // @TODO - show failure toast
    }
  };

  return (
    <Dialog.Root open={show} onOpenChange={handleOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{deleteText}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {deleteEntryConfirmation}
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              {cancel}
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleDeleteEntry} loading={isLoading}>
              {deleteText}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteBudgetEntryDialog;
