import React from 'react';
import { IonContent, IonList, IonSkeletonText, IonText, IonSpinner, IonCard } from '@ionic/react';
import { avatars, expenses_categories, income_categories, transfers_categories } from '../../../../utils/options';
import { formatDateToDDMMYY, getTransactionColor } from '../../../../utils/functions';
import { TransactionCard } from './TransactionCard';

export default function TransactionsList({ type, items, loading, error, refreshTransactions }: { type: string, items: any[]; loading: boolean, error: string | null, refreshTransactions: () => void }) {

  const renderSkeletonLoader = () => (
    <IonList>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <React.Fragment key={index}>

          <div style={skeletonStyles.date}>
            <IonSkeletonText animated style={{ width: "100px", height: "10px" }} />
          </div>

          <div style={skeletonStyles.card}>
            <IonSkeletonText animated style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
            <div style={{ flex: "1" }}>
              <IonSkeletonText animated style={{ width: "60%", height: "15px", marginBottom: "5px" }} />
              <IonSkeletonText animated style={{ width: "40%", height: "10px" }} />
            </div>
            <IonSkeletonText animated style={{ width: "60px", height: "15px" }} />
          </div>
        </React.Fragment>
      ))}
    </IonList>
  );

  if (loading) {
    return (
      <IonContent>
        {renderSkeletonLoader()}
      </IonContent>
    );
  }

  if (error) {
    return (
      <IonContent>
        <IonText style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</IonText>
      </IonContent>
    );
  }

  const groupedTransactions = items.reduce((groups, item) => {
    const date = formatDateToDDMMYY(item.date);  // Format the date (assuming formatDateToDDMMYY is available)
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, any[]>);

  return (
    <IonContent>
      <IonList style={{ marginBottom: "150px", background: "#f3f3f3" }}>
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.keys(groupedTransactions).map((date) => {
            const transactions = groupedTransactions[date];

            return (

              <React.Fragment key={date}>
                <div style={{ textAlign: "start", padding: "0px 20px" }}>
                  <small style={{ color: "var(--ion-text-color-light)" }}>{date}</small>
                </div>
                <IonCard mode='ios' style={styles.card}>
                  {transactions.map((item: any, index: any) => (
                    <React.Fragment key={item.id}>
                      <TransactionCard
                        key={item.id || Math.random()}
                        id={item.id}
                        description={item.description || 'No Description'}
                        type={item.type || 'No Type'}
                        category={item.category || 'Uncategorized'}
                        method={item.method || 'Unknown'}
                        account={item.account || 'Unknown Account'}
                        user={item.user || 'Unknown User'}
                        amount={"€".concat((parseFloat(item.amount) || 0).toFixed(2))}
                        date={item.date}
                        avatar={avatars.find((avatar) => avatar.user === item.user)?.photo || 'https://via.placeholder.com/40'}
                        color={getTransactionColor(type, item.category)}
                        refreshTransactions={refreshTransactions}
                      />
                      {transactions?.length > 1 && index != transactions?.length - 1 &&
                        <hr style={{
                          borderTop: '1px solid #dedede',
                          margin: '0 15px'
                        }} />
                      }
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
    margin: "10px 20px",
    padding: "0px",
    background: "#fff",
    boxShadow: "none",
  },
}

const skeletonStyles: { card: React.CSSProperties; date: React.CSSProperties } = {
  card: { padding: "15px 20px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  date: { margin: "10px 20px", textAlign: "end" },
};



