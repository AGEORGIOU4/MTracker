export const transactions = [
  { id: '1', date: '2024-10-01', description: 'Groceries', account: 'Visa', amount: -50, owner: 'John' },
  { id: '2', date: '2024-10-02', description: 'Gas', account: 'MasterCard', amount: -20, owner: 'John' },
  { id: '3', date: '2024-10-05', description: 'Salary', account: 'Bank Transfer', amount: 200, owner: 'John' },
  { id: '4', date: '2024-10-10', description: 'Coffee', account: 'Cash', amount: -15, owner: 'Jane' },
  { id: '5', date: '2024-10-15', description: 'Utility Bill', account: 'Direct Debit', amount: -100, owner: 'John' },
];
import { fastFoodOutline, cartOutline, carOutline, homeOutline, schoolOutline, refreshOutline, walletOutline } from 'ionicons/icons';

export const transaction_categories = [
  { label: 'Food/Coffee', value: 'Food/Coffee', icon: fastFoodOutline },
  { label: 'Shopping', value: 'Shopping', icon: cartOutline },
  { label: 'Transportation', value: 'Transportation', icon: carOutline },
  { label: 'Utilities', value: 'Utilities', icon: homeOutline },
  { label: 'Groceries', value: 'Groceries', icon: cartOutline },
  { label: 'Schools/Lessons', value: 'Schools/Lessons', icon: schoolOutline },
  { label: 'Subscriptions', value: 'Subscriptions', icon: refreshOutline },
  { label: 'Loans', value: 'Loans', icon: walletOutline },
];

export const transaction_methods = [
  { label: 'Revolut', value: 'Revolut' },
  { label: 'Hellenic Bank', value: 'Hellenic Bank' },
  { label: 'Bank of Cyprus', value: 'Bank of Cyprus' },
  { label: 'Cash', value: 'Cash' },
  { label: 'Other', value: 'Other' },
]

export const transaction_accounts = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Joint', value: 'Joint' },
]