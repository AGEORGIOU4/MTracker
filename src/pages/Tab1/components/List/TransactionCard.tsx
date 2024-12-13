import React, { useState } from 'react';
import { IonAvatar, IonCardContent, IonImg, IonLabel } from '@ionic/react';
import { getBankColor, getBankPhoto } from '../../../../utils/options';
import { ViewDetailsModal } from '../Modals/ViewDetailsModal';

export const TransactionCard: React.FC<TransactionCardProps> = ({ id, description, paymentMethod, bank, account, amount, type, user, category, date, avatar, refreshTransactions }) => {
  const [viewDetailsModalVisible, setViewDetailsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<object | null>(null);

  const handleClick = () => {
    setSelectedTransaction({ id, description, paymentMethod, bank, account, amount, type, user, category, date, avatar });
    setViewDetailsModalVisible(true);
  }

  return (
    <>
      <IonCardContent style={styles.cardContent} onClick={() => handleClick()}>
        <IonAvatar slot="start" style={styles.avatar}>
          <img
            src={avatar}
            alt="avatar"
            style={styles.avatarImage}
          />
        </IonAvatar>

        <div style={styles.textContainer}>
          <p style={styles.description}>{description?.toUpperCase()}</p>
          <small
            style={{
              backgroundColor: getBankColor(bank)[0],
              color: getBankColor(bank)[1],
              borderRadius: "20px",
              fontWeight: "500",
              fontSize: "12px",
              margin: "4px 0",
              padding: "0px 10px",
              display: "inline-block",
            }}
          >{account}</small>
        </div>

        <IonLabel slot="end" style={styles.label}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            width: '100%'
          }}>
            <IonImg style={styles.bank} src={getBankPhoto(bank)} />
            <span style={styles.amount}>
              {type === "Debit" ? `- ${amount}` : `+ ${amount}`}
            </span>
          </div>
        </IonLabel>
      </IonCardContent>

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
    margin: "10px 20px",
    padding: "0px",
    background: "#fff",
    boxShadow: "none",
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    padding: "15px",
  },
  avatar: {
    width: '30px',
    height: '30px',
    marginRight: '15px',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  textContainer: {
    flex: 1
  },
  description: {
    color: '#34505e',
    fontWeight: '500',
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
  label: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    textAlign: "end"
  },
  bank: {
    width: "20px"
  },
  account: (bank: any) => ({
    backgroundColor: getBankColor(bank),
    color: "#602a00",
    borderRadius: "20px",
    fontWeight: "500",
    fontSize: "12px",
    margin: "4px 0",
    padding: "0px 10px",
    display: "inline-block",
  }),
  amount: {
    marginTop: '10px',
    fontSize: '15px',
    color: '#000',

    whiteSpace: 'nowrap',
  },
};

interface TransactionCardProps {
  id: string;
  description: string | undefined;
  paymentMethod: string;
  bank: string;
  account: string | undefined;
  amount: string;
  type: string;
  user: string;
  category: string;
  date: string;
  avatar: string | undefined;
  refreshTransactions: () => void;
}