import { useGetBudgetEntriesQuery } from "@/services/base";
import CategoriesWidget from "@components/shared/organisms/categories-widget/CategoriesWidget";
import EmptyState from "@components/shared/atoms/empty-state/EmptyState";
import { Card, Skeleton } from "@radix-ui/themes";
import strings from "@/locals/en";

const {
  budget: { budget },
} = strings;

const BudgetOverview = () => {
  const { data, error, isLoading } = useGetBudgetEntriesQuery();

  if (error) {
    return (
      <Card>
        <p>Oops, there was an error!</p>
      </Card>
    );
  }

  if (isLoading) {
    return <Skeleton width="100%" />;
  }

  return (
    <>
      {!data ? (
        <EmptyState
          message="No budget entries to show"
          description="Please try again"
        />
      ) : (
        <CategoriesWidget title={budget} entries={data} />
      )}
    </>
  );
};

export default BudgetOverview;
