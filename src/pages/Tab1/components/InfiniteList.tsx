import React, { useState } from 'react';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList
} from '@ionic/react';
import TransactionCard from './TransactionCard';

const styles = {
  dateContainer: {
    textAlign: 'right',
    padding: '5px 20px',
  },
  dateText: {
    color: 'var(--ion-text-color-light)',
  },
};

const initialTransactions = [
  { id: '0', date: '2024-09-01', description: 'Groceries', account: 'Visa', amount: "50", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '1', date: '2024-10-01', description: 'Groceries', account: 'Visa', amount: "50", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '2', date: '2024-10-02', description: 'Gas', account: 'MasterCard', amount: "20", owner: 'John', photo: 'https://ui-avatars.com/api/?name=COnstantina+Hadjianastasi&background=9b15e2&color=fff' },
  { id: '3', date: '2024-10-05', description: 'Salary', account: 'Bank Transfer', amount: "200", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '4', date: '2024-10-10', description: 'Coffee', account: 'Cash', amount: "15", owner: 'Jane', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '5', date: '2024-10-15', description: 'Utility Bill', account: 'Direct Debit', amount: "100", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
  { id: '6', date: '2021-10-15', description: 'Utility Bill', account: 'Direct Debit', amount: "100", owner: 'John', photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff' },
];

function InfiniteList() {
  const [items, setItems] = useState(initialTransactions);

  const generateItems = () => {

    const newTransactions = Array.from({ length: 5 }, (_, i) => ({
      id: `${items.length + i}`,
      date: new Date().toISOString().split('T')[0],
      description: `Generated Item ${items.length + i}`,
      account: 'Generated Account',
      amount: "50",
      owner: `Owner ${items.length + i}`,
      photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff',
    }));
    setItems((prevItems) => [...prevItems, ...newTransactions]);
  };

  return (
    <IonContent>
      <IonList>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div style={styles.dateContainer}>
              <small style={styles.dateText}>{item.date}</small>
            </div>
            <TransactionCard
              description={item.description}
              account={item.account}
              avatar={item.photo}
              amount={"-€".concat(item.amount)}
            />
          </React.Fragment>
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          generateItems();
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
}

export default InfiniteList;
