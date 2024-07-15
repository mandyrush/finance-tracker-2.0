import { useGetBudgetEntriesQuery } from '@/services/base';
import CategoriesWidget from '@/components/organisms/categories-widget/CategoriesWidget';
import EmptyState from '@/components/atoms/empty-state/EmptyState';
import { Card, Skeleton } from '@radix-ui/themes';
import strings from '@/locals/en';

const {
  global: { error: globalError },
  budget: {
    budget,
    emptyState: { message, description },
  },
} = strings;

const BudgetOverview = () => {
  const { data, error, isLoading } = useGetBudgetEntriesQuery();

  if (error) {
    return (
      <Card>
        <p>{globalError}</p>
      </Card>
    );
  }

  if (isLoading) {
    return <Skeleton width="100%" />;
  }

  return (
    <>
      {!data ? (
        <EmptyState message={message} description={description} />
      ) : (
        <CategoriesWidget title={budget} entries={data} />
      )}
    </>
  );
};

export default BudgetOverview;
