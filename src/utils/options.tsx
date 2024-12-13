import { fastFoodOutline, cartOutline, carOutline, homeOutline, schoolOutline, refreshOutline, walletOutline, cashOutline, appsOutline, giftOutline, heartOutline, cardOutline, arrowForwardCircleOutline } from 'ionicons/icons';

const dummy = {
  "id": "0e097811-c85b-4578-aff1-8cdc2d25d6f7",
  "description": "1Bank - Transfer",
  "paymentMethod": "Bank Transfer",
  "bank": "Bank of Cyprus",
  "account": "Joint",
  "amount": "100.00",
  "type": "Debit",
  "user": "Joint",
  "category": "Uncategorized",
  "date": "2024-11-04T00:00:00.000",
  "timestamp": {
    "nanoseconds": 0,
    "seconds": 1712782800
  },
}

export const paymentMethods =
  [
    "Bank Transfer", "Cash"
  ]

export const banks = [
  {
    value: "Revolut",
    id: "REVOLUT_REVOLT21",
  },
  {
    value: "Bank of Cyprus",
    id: "BANKOFCYPRUS_BCYPCY2NXXX"
  },
  {
    value: "Hellenic Bank",
    id: "HELLENIC_BANK_HEBACY2NXXX"
  }
]

export const accountTypes = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Joint', value: 'Joint' },
]


// export const paymentMethods = [
//   { label: 'Credit Card', value: 'Revolut' },
//   { label: 'Hellenic Bank', value: 'Hellenic Bank' },
//   { label: 'Bank of Cyprus', value: 'Bank of Cyprus' },
//   { label: 'Cash', value: 'Cash' },
//   { label: 'Other', value: 'Other' },
// ]

export const users = [
  { label: 'Andreas', value: 'Andreas' },
  { label: 'Constantina', value: 'Constantina' },
  { label: 'Both', value: 'Both' },
]

export const getBankPhoto = (bank: any) => {
  switch (bank) {
    case "Revolut":
      return "revolut.png"
    case "Hellenic Bank":
      return "hb.png"
    case "Bank of Cyprus":
      return "boc.png"
    case "Cash":
      return "cash.png"
    default:
      return "favicon.png"
  }
}

export const getBankColor = (bank: any) => {
  switch (bank) {
    case "Revolut":
      return ["#000", "#fff"]
    case "Hellenic Bank":
      return ["#3990d0", "#fff"]
    case "Bank of Cyprus":
      return ["#0587b0", "#fff"]
    case "Cash":
      return ["#1e7524", "#fff"]
    default:
      return ""
  }
}


export const avatars = [
  { user: 'Andreas', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=1e7527&color=fff' },
  { user: 'Constantina', photo: 'https://ui-avatars.com/api/?name=COnstantina+Hadjianastasi&background=751e32&color=fff' },
  { user: 'Joint', photo: 'https://ui-avatars.com/api/?name=AK&background=641e75&color=fff' },
  { user: 'N/A', photo: 'https://ui-avatars.com/api/?name=AK&background=13ab25&color=fff' },
]

export const payment_categories = [
  { label: 'Food/Coffee', value: 'Food/Coffee', icon: fastFoodOutline, color: '#FF6B6B' }, // Soft Red
  { label: 'Shopping', value: 'Shopping', icon: cartOutline, color: '#48C774' }, // Soft Green
  { label: 'Transportation', value: 'Transportation', icon: carOutline, color: '#4FC3F7' }, // Soft Blue
  { label: 'Utilities', value: 'Utilities', icon: homeOutline, color: '#F48FB1' }, // Soft Pink
  { label: 'Groceries', value: 'Groceries', icon: cartOutline, color: '#9575CD' }, // Soft Purple
  { label: 'School/Lesson', value: 'School/Lesson', icon: schoolOutline, color: '#FFD54F' }, // Soft Yellow
  { label: 'Subscription', value: 'Subscription', icon: refreshOutline, color: '#4DB6AC' }, // Soft Teal
  { label: 'Loan', value: 'Loan', icon: walletOutline, color: '#F06292' }, // Soft Magenta
  { label: 'Other', value: 'Other', icon: cashOutline, color: '#BDBDBD' }, // Soft Gray,
  { label: 'Salary', value: 'Salary', icon: walletOutline, color: '#FF6B6B' }, // Soft Red
  { label: 'Freelance', value: 'Freelance', icon: appsOutline, color: '#48C774' }, // Soft Green
  { label: 'Contributions', value: 'Contributions', icon: cashOutline, color: '#4FC3F7' }, // Soft Blue
  { label: 'Teaching', value: 'Teaching/Lessons', icon: schoolOutline, color: '#FFD54F' }, // Soft Yellow
  { label: 'Gift', value: 'Gift', icon: giftOutline, color: '#9575CD' }, // Soft Purple
  { label: 'Donations', value: 'Donations', icon: heartOutline, color: '#F48FB1' }, // Soft Pink
];