import { useGetBudgetEntriesQuery } from '@/services/base';
import CategoryEntriesTable from '@components/organisms/category-entries-table/CategoryEntriesTable';
import ExpenseForm from '@/components/organisms/expense-form/ExpenseForm';
import CategoryForm from '@components/organisms/category-form/CategoryForm';
import PaymentMethodForm from '@/components/organisms/payment-method-form/PaymentMethodForm';
import EmptyState from '@/components/atoms/empty-state/EmptyState';
import Loader from '@/components/atoms/loader/Loader';
import AlertCallout from '@components/atoms/alert-callout/AlertCallout';
import { Container, Card, Flex, Box, Heading } from '@radix-ui/themes';
import strings from '@/locals/en';

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
                <Card>
                  <ExpenseForm />
                </Card>
              </Box>

              <Box>
                <CategoryForm />
              </Box>

              <Box>
                <PaymentMethodForm />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default BudgetDetail;
