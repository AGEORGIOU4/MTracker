export const initialTransactions = [
  { id: '0', date: '2024-09-01', description: 'Groceries', category: "Shopping", account: 'Visa', amount: "50", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '1', date: '2024-10-01', description: 'Food/Coffee', category: "Groceries", account: 'Visa', amount: "50", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '2', date: '2024-10-02', description: 'Gas', category: "Transportation", account: 'MasterCard', amount: "20", owner: 'John', photo: 'https://ui-avatars.com/api/?name=COnstantina+Hadjianastasi&background=9b15e2&color=fff' },
  { id: '3', date: '2024-10-05', description: 'Salary', category: "Utilities", account: 'Bank Transfer', amount: "200", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '4', date: '2024-10-10', description: 'Coffee', category: "Schools/Lessons", account: 'Cash', amount: "15", owner: 'Jane', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '5', date: '2024-10-15', description: 'Schools/Lessons', category: "Subscriptions", account: 'Direct Debit', amount: "100", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '6', date: '2021-10-15', description: 'Utility Bill', category: "Loans", account: 'Direct Debit', amount: "100", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
];

import { fastFoodOutline, cartOutline, carOutline, homeOutline, schoolOutline, refreshOutline, walletOutline, cashOutline } from 'ionicons/icons';

export const transaction_categories = [
  { label: 'Food/Coffee', value: 'Food/Coffee', icon: fastFoodOutline, color: '#FF5733' },
  { label: 'Shopping', value: 'Shopping', icon: cartOutline, color: '#33FF57' },
  { label: 'Transportation', value: 'Transportation', icon: carOutline, color: '#3357FF' },
  { label: 'Utilities', value: 'Utilities', icon: homeOutline, color: '#FF33A1' },
  { label: 'Groceries', value: 'Groceries', icon: cartOutline, color: '#A133FF' },
  { label: 'Schools/Lessons', value: 'Schools/Lessons', icon: schoolOutline, color: '#FFD733' },
  { label: 'Subscriptions', value: 'Subscriptions', icon: refreshOutline, color: '#33FFF1' },
  { label: 'Loans', value: 'Loans', icon: walletOutline, color: '#F133FF' },
  { label: 'Other', value: 'Other', icon: cashOutline, color: '#A1A1A1' },
];

export const transaction_types = [
  { label: 'Expense', value: 'Expense' },
  { label: 'Income', value: 'Income' },
  { label: 'Transfer', value: 'Transfer' }
]
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

export const transaction_users = [
  { label: 'Andreas', value: 'Andreas' },
  { label: 'Constantina', value: 'Constantina' },
  { label: 'Both', value: 'Both' },
]