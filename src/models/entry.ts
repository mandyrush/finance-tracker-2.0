export enum EntriesApiTag {
  Entries = 'Entries',
}

export enum EntryType {
  Asset = 'Asset',
  Debt = 'Debt',
  Income = 'Income',
  Expense = 'Expense',
  Budget = 'Budget',
}

export enum EntryFrequency {
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  SemiAnnual = 'SemiAnnual',
  Yearly = 'Yearly',
}

export interface Entry {
  id: number;
  name: string;
  amount: number;
  category: string;
  entryType: EntryType;
  frequency: EntryFrequency;
  dueDate: string;
  paymentMethod: string;
}
