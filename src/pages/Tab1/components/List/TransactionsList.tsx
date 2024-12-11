import React from 'react';
import {
  IonContent,
  IonList,
  IonSkeletonText,
  IonText,
  IonCard,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import { avatars } from '../../../../utils/options';
import { formatDateToDDMMYY } from '../../../../utils/functions';
import { TransactionCard } from './TransactionCard';

export default function TransactionsList({ type, items, loading, error, refreshTransactions, }: { type: string; items: any[]; loading: boolean; error: string | null; refreshTransactions: () => void; }) {
  const renderSkeletonLoader = () => (
    <IonList>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <React.Fragment key={index}>
          <div style={skeletonStyles.date}>
            <IonSkeletonText animated style={{ width: '100px', height: '10px' }} />
          </div>

          <div style={skeletonStyles.card}>
            <IonSkeletonText
              animated
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
            <div style={{ flex: '1' }}>
              <IonSkeletonText
                animated
                style={{ width: '60%', height: '15px', marginBottom: '5px' }}
              />
              <IonSkeletonText animated style={{ width: '40%', height: '10px' }} />
            </div>
            <IonSkeletonText animated style={{ width: '60px', height: '15px' }} />
          </div>
        </React.Fragment>
      ))}
    </IonList>
  );

  if (loading) {
    return (
      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={(event) => {
            refreshTransactions();
            event.detail.complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
        {renderSkeletonLoader()}
      </IonContent>
    );
  }

  // Error State
  if (error) {
    return (
      <IonContent>
        <IonRefresher
          slot="fixed"

          onIonRefresh={(event) => {
            refreshTransactions();
            event.detail.complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
        <IonText style={{ color: 'red', textAlign: 'center', marginTop: '20px', display: 'block' }}>
          {error}
        </IonText>
      </IonContent>
    );
  }

  // Group Transactions by Date
  const groupedTransactions = items.reduce((groups, item) => {
    const date = formatDateToDDMMYY(item.date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, any[]>);

  // Render List
  return (
    <IonContent >
      <IonRefresher
        slot="fixed"
        onIonRefresh={(event) => {
          refreshTransactions();
          event.detail.complete();
        }}
      >
        <IonRefresherContent />
      </IonRefresher>

      <IonList style={{ marginBottom: "200px", background: '#f6f6f6' }}>
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.keys(groupedTransactions).map((date) => {
            const transactions = groupedTransactions[date];

            return (
              <React.Fragment key={date}>
                <div style={{ textAlign: 'start', padding: '10px 20px' }}>
                  <small style={{ color: 'var(--ion-text-color-light)' }}>{date}</small>
                </div>

                {/* Transactions List */}
                <IonCard style={styles.card}>
                  {transactions.map((item: any, index: any) => (
                    <React.Fragment key={item.id}>
                      <TransactionCard
                        id={item.id}
                        description={item.description || 'No Description'}
                        type={item.type || 'No Type'}
                        category={item.category || 'Uncategorized'}
                        method={item.method || 'Unknown'}
                        account={item.account || 'Unknown Account'}
                        user={item.user || 'Unknown User'}
                        amount={`€${(parseFloat(item.amount) || 0).toFixed(2)}`}
                        date={item.date}
                        avatar={
                          avatars.find((avatar) => avatar.user === item.user)?.photo ||
                          'https://via.placeholder.com/40'
                        }
                        refreshTransactions={refreshTransactions}
                      />
                      {transactions.length > 1 && index !== transactions.length - 1 && (
                        <hr
                          style={{
                            borderTop: '1px solid #e4e4e4',
                            margin: '0 15px',
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </IonCard>
              </React.Fragment>
            );
          })
        ) : (
          <IonText style={{ textAlign: 'center', display: 'block', marginTop: '20px' }}>
            No transactions available for the selected date.
          </IonText>
        )}
      </IonList>
    </IonContent>
  );
}

const styles = {
  card: {
    margin: '10px 20px',
    padding: '0px',
    background: '#fff'
  },
};

const skeletonStyles: { card: React.CSSProperties; date: React.CSSProperties } = {
  card: { padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  date: { margin: '10px 20px', textAlign: 'end' },
};
