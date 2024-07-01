import { handlers as budgetEntriesHandlers } from './budgetEntries';
import { handlers as budgetCategoriesHandlers } from './budgetCategories';
import { handlers as paymentMethodsHandlers } from './paymentMethods';

export const handlers = [
  ...budgetEntriesHandlers,
  ...budgetCategoriesHandlers,
  ...paymentMethodsHandlers,
];
