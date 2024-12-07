import { fastFoodOutline, cartOutline, carOutline, homeOutline, schoolOutline, refreshOutline, walletOutline, cashOutline, appsOutline, giftOutline, heartOutline, cardOutline, arrowForwardCircleOutline } from 'ionicons/icons';

export const dummyTransactions = [
  { id: '0', date: '2024-09-01', description: 'Groceries', category: "Shopping", type: "Expenses", method: 'Revolut', amount: "50", account: "Personal", user: 'Andreas' },
  { id: '1', date: '2024-10-01', description: 'Food/Coffee', category: "Groceries", type: "Expenses", method: 'BoC', amount: "50", account: "Joint", user: 'Andreas' },
  { id: '2', date: '2024-10-02', description: 'Gas', category: "Transportation", type: "Expenses", method: 'HB', amount: "20", account: "Joint", user: 'Constantina' },
  { id: '3', date: '2024-10-05', description: 'Salary', category: "Utilities", type: "Expenses", method: 'Revolut', amount: "200", account: "Joint", user: 'Andreas' },
  { id: '4', date: '2024-10-10', description: 'Coffee', category: "Schools/Lessons", type: "Expenses", method: 'Cash', amount: "15", account: "Personal", user: 'Constantina' },
  { id: '5', date: '2024-10-15', description: 'Schools/Lessons', category: "Subscriptions", type: "Expenses", method: 'Revolut', account: "Joint", amount: "100", user: 'Andreas' },
  { id: '6', date: '2021-10-15', description: 'Utility Bill', category: "Loans", type: "Expenses", method: 'BoC', amount: "100", account: "Joint", owner: 'John', user: 'Andreas' },
];

export const avatars = [
  { user: 'Andreas', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { user: 'Constantina', photo: 'https://ui-avatars.com/api/?name=COnstantina+Hadjianastasi&background=9b15e2&color=fff' }
]

export const expenses_categories = [
  { label: 'Food/Coffee', value: 'Food/Coffee', icon: fastFoodOutline, color: '#FF6B6B' }, // Soft Red
  { label: 'Shopping', value: 'Shopping', icon: cartOutline, color: '#48C774' }, // Soft Green
  { label: 'Transportation', value: 'Transportation', icon: carOutline, color: '#4FC3F7' }, // Soft Blue
  { label: 'Utilities', value: 'Utilities', icon: homeOutline, color: '#F48FB1' }, // Soft Pink
  { label: 'Groceries', value: 'Groceries', icon: cartOutline, color: '#9575CD' }, // Soft Purple
  { label: 'School/Lesson', value: 'School/Lesson', icon: schoolOutline, color: '#FFD54F' }, // Soft Yellow
  { label: 'Subscription', value: 'Subscription', icon: refreshOutline, color: '#4DB6AC' }, // Soft Teal
  { label: 'Loan', value: 'Loan', icon: walletOutline, color: '#F06292' }, // Soft Magenta
  { label: 'Other', value: 'Other', icon: cashOutline, color: '#BDBDBD' }, // Soft Gray
];

export const income_categories = [
  { label: 'Salary', value: 'Salary', icon: walletOutline, color: '#FF6B6B' }, // Soft Red
  { label: 'Freelance', value: 'Freelance', icon: appsOutline, color: '#48C774' }, // Soft Green
  { label: 'Contributions', value: 'Contributions', icon: cashOutline, color: '#4FC3F7' }, // Soft Blue
  { label: 'Teaching', value: 'Teaching/Lessons', icon: schoolOutline, color: '#FFD54F' }, // Soft Yellow
  { label: 'Gift', value: 'Gift', icon: giftOutline, color: '#9575CD' }, // Soft Purple
  { label: 'Donations', value: 'Donations', icon: heartOutline, color: '#F48FB1' }, // Soft Pink
];



export const transfers_categories = [
  { label: 'Savings', value: 'Savings', icon: walletOutline, color: '#FF6B6B' }, // Soft Red
  { label: 'Payments', value: 'Payments', icon: cardOutline, color: '#48C774' }, // Soft Green
  { label: 'Contributions', value: 'Contributions', icon: arrowForwardCircleOutline, color: '#4FC3F7' }, // Soft Blue
];



export const types = [
  { label: 'Expenses', value: 'Expenses' },
  { label: 'Income', value: 'Income' },
  { label: 'Transfer', value: 'Transfer' }
]

export const methods = [
  { label: 'Revolut', value: 'Revolut' },
  { label: 'Hellenic Bank', value: 'HB' },
  { label: 'Bank of Cyprus', value: 'BoC' },
  { label: 'Cash', value: 'Cash' },
  { label: 'Other', value: 'Other' },
]

export const accounts = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Joint', value: 'Joint' },
]

export const users = [
  { label: 'Andreas', value: 'Andreas' },
  { label: 'Constantina', value: 'Constantina' },
  { label: 'Both', value: 'Both' },
]

export const getMethodPhoto = (method: any) => {
  switch (method) {
    case "Revolut":
      return "revolut.png"
    case "HB":
      return "hb.png"
    case "BoC":
      return "boc.png"
    case "Cash":
      return "boc.png"
    default:
      return ""
  }
}