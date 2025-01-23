import { Category } from './category';
import { PaymentMethod } from './paymentMethod';

export enum EntriesApiTag {
  Entries = 'Entries',
  Entry = 'Entry',
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
  category: Category;
  entryType: EntryType;
  frequency: EntryFrequency;
  dueDate: string;
  paymentMethod: PaymentMethod;
}
