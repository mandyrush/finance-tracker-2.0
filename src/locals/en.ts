const strings = {
  global: {
    actions: 'Actions',
    amount: 'Amount',
    category: 'Category',
    dashboard: 'Dashboard',
    delete: 'Delete',
    dueDate: 'Due Date',
    edit: 'Edit',
    frequency: 'Frequency',
    grandTotal: 'Grand Total',
    loading: 'Loading',
    name: 'Name',
    paymentMethod: 'Payment Method',
    save: 'Save',
    select: 'Select',
    total: 'Total',
    view: 'View',
  },
  budget: {
    addExpense: 'Add Expense',
    addCategory: 'Add Category',
    addPaymentMethod: 'Add Payment Method',
    budget: 'Budget',
    budgetDetail: 'Budget Detail',
    callouts: {
      createBudgetEntryFailure:
        'Failed to create budget entry. Please refresh the page and try again.',
      createBudgetEntrySuccess: 'Budget entry created.',
      createCategoryFailure:
        'Failed to create category. Please refresh the page and try again.',
      createCategorySuccess: 'Category created.',
      createPaymentMethodFailure:
        'Failed to create payment method. Please refresh the page and try again.',
      createPaymentMethodSuccess: 'Payment method created.',
      fetchBudgetDetailFail:
        'Failed to load the budget details, please refresh the page and try again.',
    },
    emptyState: {
      description: 'Create a new budget entry to get started.',
      message: 'No entries found',
    },
    item: 'Item',
    validation: {
      categoryExists: 'Category already exists.',
      categoryRequired: 'Please enter a category name.',
      enterAnAmount: 'Please enter an amount.',
      enterDueDate: 'Please enter a due date.',
      mustBeANumber: 'Must be a number.',
      mustBeThirtyCharacters: 'Must be 30 characters or less.',
      nameRequired: 'Please enter a name for this expense.',
      paymentMethodExists: 'Payment method already exists.',
      paymentMethodRequired: 'Please enter a payment method.',
      selectCategory: 'Please select a category.',
      selectFrequency: 'Please select a frequency.',
      selectPaymentMethod: 'Please select a payment method.',
    },
  },
};

export default strings;
