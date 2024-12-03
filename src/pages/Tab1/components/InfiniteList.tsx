import React, { useState, useEffect } from 'react';
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

function InfiniteList() {
  const [items, setItems] = useState<string[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 50; i++) {
      newItems.push(`Item ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };

  console.log(items);

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonContent>
      <IonList style={styles.list}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div style={styles.dateContainer}>
              <small style={styles.dateText}>13-10-2024</small>
            </div>
            <TransactionCard
              description="Dynamic Card Title"
              method="Visa"
              price="-€50"
              index={index}
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
