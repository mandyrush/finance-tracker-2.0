import { handlers as budgetEntriesHandlers } from './budgetEntries';
import { handlers as budgetCategoriesHandlers } from './budgetCategories';

export const handlers = [...budgetEntriesHandlers, ...budgetCategoriesHandlers];
