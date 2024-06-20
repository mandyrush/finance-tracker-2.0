import { useGetBudgetEntriesQuery } from "@/services/base";
import CategoryEntriesTable from "@components/shared/organisms/category-entries-table/CategoryEntriesTable";
import ExpenseForm from "@components/budget/organisms/expense-form/ExpenseForm";
import CategoryForm from "@components/budget/organisms/category-form/CategoryForm";
import PaymentMethodForm from "@components/budget/organisms/payment-method-form/PaymentMethodForm";
import FrequencyForm from "@components/budget/organisms/frequency-form/FrequencyForm";
import EmptyState from "@components/shared/atoms/empty-state/EmptyState";
import Loader from "@components/shared/atoms/loader/Loader";
import AlertCallout from "@components/shared/atoms/alert-callout/AlertCallout";
import { Container, Flex, Box, Heading } from "@radix-ui/themes";
import strings from "@/locals/en";

const {
  budget: {
    budgetDetail,
    callouts: { fetchBudgetDetailFail },
    emptyState: { message, description },
  },
} = strings;

const BudgetDetail = () => {
  const { data = [], error, isLoading } = useGetBudgetEntriesQuery();

  return (
    <>
      {/* @TODO - move the error callout to a centralized location */}
      {error && <AlertCallout message={fetchBudgetDetailFail} />}
      <Container pt="6" pb="6">
        <Heading as="h1">{budgetDetail}</Heading>
        <Flex gap="6">
          <Box width="100%">
            {isLoading ? (
              <Loader />
            ) : !data.length ? (
              <EmptyState message={message} description={description} />
            ) : (
              <CategoryEntriesTable tableData={data} />
            )}
          </Box>
          <Box width="450px">
            <Flex direction="column" gap="6">
              <Box>
                <ExpenseForm />
              </Box>

              <Box>
                <CategoryForm />
              </Box>

              <Box>
                <PaymentMethodForm />
              </Box>

              <Box>
                <FrequencyForm />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default BudgetDetail;
