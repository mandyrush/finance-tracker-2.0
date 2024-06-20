import { EntryType, EntryFrequency } from "@/models/entry";

export const budgetEntries = [
  [
    2001,
    {
      id: 2001,
      name: "Car Insurance",
      amount: 150.0,
      category: "car",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "1st",
      paymentMethod: "Credit Card Chase-A",
    },
  ],
  [
    2002,
    {
      id: 2002,
      name: "Truck Loan",
      amount: 345.72,
      category: "car",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "30th",
      paymentMethod: "Checking",
    },
  ],
  [
    2003,
    {
      id: 2003,
      name: "Internet",
      amount: 75.0,
      category: "technology",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "3rd",
      paymentMethod: "Credit Card 3333",
    },
  ],
  [
    2004,
    {
      id: 2004,
      name: "Public Utilities",
      amount: 70.0,
      category: "home",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "30th",
      paymentMethod: "Credit Card Chase-A",
    },
  ],
  [
    2005,
    {
      id: 2005,
      name: "Northwestern Energy",
      amount: 70.0,
      category: "home",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "20st",
      paymentMethod: "Checking",
    },
  ],
  [
    2006,
    {
      id: 2006,
      name: "Mortgage",
      amount: 1623.29,
      category: "home",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "1st",
      paymentMethod: "Checking",
    },
  ],
  [
    2007,
    {
      id: 2007,
      name: "MDU",
      amount: 95.0,
      category: "home",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "27th",
      paymentMethod: "Checking",
    },
  ],
  [
    2008,
    {
      id: 2008,
      name: "Gas",
      amount: 100.0,
      category: "car",
      entryType: EntryType.Budget,
      frequency: EntryFrequency.Monthly,
      dueDate: "30th",
      paymentMethod: "Credit Card Chase-D",
    },
  ],
];