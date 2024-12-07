import React from 'react';
import { IonAvatar, IonCard, IonCardContent, IonLabel } from '@ionic/react';

const styles = {
  card: {
    background: "#f9f9f9",
    borderRadius: '20px',
    boxShadow: 'none',
    transition: 'transform 0.3s ease-in-out',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
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
  label: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    textAlign: "end"
  },
  account: {
    fontSize: '12px',
    color: '#555',
  },
  amount: {
    fontSize: '15px',
    color: '#000',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
};

interface TransactionCardProps {
  avatar: string,
  description: string;
  category: string;
  account: string;
  amount: string;
  color: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ avatar, description, category, account, amount, color }) => {
  return (
    <IonCard
      style={styles.card}
    >
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
          <small style={styles.account}>{account}</small>
          <span style={styles.amount}>{amount}</span>
        </IonLabel>
      </IonCardContent>
    </IonCard>
  );
}

export default TransactionCard;
