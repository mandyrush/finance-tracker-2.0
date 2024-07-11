import { Dialog, Button, Flex } from '@radix-ui/themes';

const DeleteBudgetEntryDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Delete</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Delete</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete this budget entry?
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteBudgetEntryDialog;
