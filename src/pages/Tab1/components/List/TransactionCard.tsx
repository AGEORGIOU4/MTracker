import React, { useState } from 'react';
import { IonAvatar, IonCard, IonCardContent, IonImg, IonLabel } from '@ionic/react';
import { getMethodPhoto } from '../../../../utils/options';
import { ViewDetailsModal } from '../Modals/ViewDetailsModal';

export const TransactionCard: React.FC<TransactionCardProps> = ({ id, description, type, category, method, account, amount, date, user, avatar, color, refreshTransactions }) => {
  const [viewDetailsModalVisible, setViewDetailsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<object | null>(null);

  const handleClick = () => {
    setSelectedTransaction({ id, description, type, category, method, account, amount, date, user, avatar, color });
    setViewDetailsModalVisible(true);
  }

  return (
    <>
      <IonCard mode='ios' style={styles.card} onClick={() => handleClick()}>
        <IonCardContent style={styles.cardContent}>
          <IonAvatar slot="start" style={styles.avatar}>
            <img
              src={avatar}
              alt="avatar"
              style={styles.avatarImage}
            />
          </IonAvatar>

          <div style={styles.textContainer}>
            <p style={styles.description}>{description}</p>
            <small style={styles.category(color)}>{category}</small>
          </div>

          <IonLabel slot="end" style={styles.label}>
            <div style={styles.labelDiv}>
              <span style={styles.amount}>{amount}</span>
              <small style={styles.account}>{account}</small>
              <IonImg style={styles.method} src={getMethodPhoto(method)} />
            </div>
          </IonLabel>
        </IonCardContent>
      </IonCard>

      {selectedTransaction && <ViewDetailsModal
        isOpen={viewDetailsModalVisible}
        setIsOpen={setViewDetailsModalVisible}
        selectedTransaction={selectedTransaction}
        refreshTransactions={refreshTransactions}
      />
      }
    </>
  );
}

const styles = {
  card: {
    margin: "10px 10px",
    padding: "0px",
    background: "#fff",
    boxShadow: "none",
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    padding: "10px",

  },
  avatar: {
    width: '40px',
    height: '40px',
    marginRight: '15px',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  textContainer: {
    flex: 1,
  },
  description: {
    color: '#000',
    fontWeight: '600',
    margin: '0',
    fontSize: '14px',
    marginBottom: "4px"
  },
  categoryAccountContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  category: (color: string) => ({
    background: color,
    fontSize: '12px',
    color: 'white',
    padding: "5px",
    borderRadius: "15px",
  }),
  labelDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    textAlign: "end"
  },
  method: {
    width: "20px"
  },
  account: {
    fontSize: '12px',
    color: '#555'
  },
  amount: {
    fontSize: '15px',
    color: '#000',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
};

interface TransactionCardProps {
  id: string;
  description: string;
  type: string;
  category: string;
  method: string;
  account: string;
  amount: string;
  date: string;
  user: string;
  avatar: string | undefined;
  color: string;
  refreshTransactions: () => void;
}