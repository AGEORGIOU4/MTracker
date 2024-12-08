import React from 'react';
import { IonContent, IonList, IonSkeletonText, IonText, IonSpinner } from '@ionic/react';
import { avatars, expenses_categories, income_categories, transfers_categories } from '../../../../utils/options';
import { formatDateToDDMMYY } from '../../../../utils/functions';
import { TransactionCard } from './TransactionCard';

export default function TransactionsList({ type, items, loading, error, refreshTransactions }: { type: string, items: any[]; loading: boolean, error: string | null, refreshTransactions: () => void }) {
  // Skeleton loader content
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

  // Show error state
  if (error) {
    return (
      <IonContent>
        <IonText style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</IonText>
      </IonContent>
    );
  }

  // Show transactions list
  return (
    <IonContent>
      <IonList style={{ marginBottom: "150px", background: "#f3f3f3" }}>
        {items.length > 0 ? (
          items.map((item: any) => (
            <React.Fragment key={item.id || Math.random()}>
              <div style={{ textAlign: "end", padding: "0px 20px" }}>
                <small style={{ color: "var(--ion-text-color-light)" }}>{formatDateToDDMMYY(item.date)}</small>
              </div>
              <TransactionCard
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
                color={
                  type === "Expenses"
                    ? expenses_categories.find((category) => category.value === item.category)?.color || "#dedede"
                    : type === "Income"
                      ? income_categories.find((category) => category.value === item.category)?.color || "#dedede"
                      : type === "Transfers"
                        ? transfers_categories.find((category) => category.value === item.category)?.color || "#dedede"
                        : "#dedede"
                }
                refreshTransactions={refreshTransactions}
              />
            </React.Fragment>
          ))
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

}

const skeletonStyles: { card: React.CSSProperties; date: React.CSSProperties } = {
  card: { padding: "15px 20px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  date: { margin: "10px 20px", textAlign: "end" },
};



