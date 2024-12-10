import { fastFoodOutline, cartOutline, carOutline, homeOutline, schoolOutline, refreshOutline, walletOutline, cashOutline, appsOutline, giftOutline, heartOutline, cardOutline, arrowForwardCircleOutline } from 'ionicons/icons';

export const avatars = [
  { user: 'Andreas', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { user: 'Constantina', photo: 'https://ui-avatars.com/api/?name=COnstantina+Hadjianastasi&background=9b15e2&color=fff' },
  { user: 'Joint', photo: 'https://ui-avatars.com/api/?name=AK&background=ab4d13&color=fff' },
  { user: 'N/A', photo: 'https://ui-avatars.com/api/?name=AK&background=13ab25&color=fff' },
]

export const credit_categories = [
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

export const debit_categories = [
  { label: 'Salary', value: 'Salary', icon: walletOutline, color: '#FF6B6B' }, // Soft Red
  { label: 'Freelance', value: 'Freelance', icon: appsOutline, color: '#48C774' }, // Soft Green
  { label: 'Contributions', value: 'Contributions', icon: cashOutline, color: '#4FC3F7' }, // Soft Blue
  { label: 'Teaching', value: 'Teaching/Lessons', icon: schoolOutline, color: '#FFD54F' }, // Soft Yellow
  { label: 'Gift', value: 'Gift', icon: giftOutline, color: '#9575CD' }, // Soft Purple
  { label: 'Donations', value: 'Donations', icon: heartOutline, color: '#F48FB1' }, // Soft Pink
];

export const types = [
  { label: 'Debit', value: 'Debit' },
  { label: 'Credit', value: 'Credit' },
]

export const methods = [
  { label: 'Revolut', value: 'Revolut' },
  { label: 'Hellenic Bank', value: 'Hellenic Bank' },
  { label: 'Bank of Cyprus', value: 'Bank of Cyprus' },
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
    case "Hellenic Bank":
      return "hb.png"
    case "Bank of Cyprus":
      return "boc.png"
    case "Cash":
      return "boc.png"
    default:
      return ""
  }
}