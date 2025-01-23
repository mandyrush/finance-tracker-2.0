import { Dialog, VisuallyHidden } from '@radix-ui/themes';
import ExpenseForm from '@/components/organisms/expense-form/ExpenseForm';
import { useGetBudgetEntryQuery } from '@/services/base';
import Loader from '@/components/atoms/loader/Loader';
import strings from '@/locals/en';

const {
  global: { edit },
  budget: {
    actions: { editBudgetEntryDescription },
  },
} = strings;

interface EditBudgetEntryDialogProps {
  show: boolean;
  handleOpenChange: () => void;
  selectedId: number;
}

const EditBudgetEntryDialog = ({
  show,
  handleOpenChange,
  selectedId,
}: EditBudgetEntryDialogProps) => {
  const {
    data: selectedEntry,
    isLoading: isSelectedEntryLoading,
    // error: isSelectedEntryError,
  } = useGetBudgetEntryQuery(selectedId);

  return (
    <Dialog.Root open={show} onOpenChange={handleOpenChange}>
      <Dialog.Content maxWidth="450px">
        <VisuallyHidden>
          <Dialog.Title>{edit}</Dialog.Title>
          <Dialog.Description>{editBudgetEntryDescription}</Dialog.Description>
        </VisuallyHidden>

        {isSelectedEntryLoading ? (
          <Loader />
        ) : (
          <ExpenseForm
            expense={selectedEntry}
            handleDialogClose={handleOpenChange}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditBudgetEntryDialog;
