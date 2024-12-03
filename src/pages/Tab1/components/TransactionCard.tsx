import React from 'react';
import { IonAvatar, IonCard, IonCardContent, IonLabel } from '@ionic/react';

interface TransactionCardProps {
  description: string;
  method: string;
  price: string;
  index: number;
}

const styles = {
  card: {
    background: "#fff",
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
    fontSize: '12px',
  },
  method: {
    color: 'var(--ion-text-color-light)',
  },
  price: {
    fontSize: '12px',
    color: '#000',
    fontWeight: '500',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
};

const TransactionCard: React.FC<TransactionCardProps> = ({ description, method, price, index }) => {


  return (
    <IonCard
      style={styles.card}
    >
      <IonCardContent style={styles.cardContent}>
        <IonAvatar slot="start" style={styles.avatar}>
          <img
            src={'https://picsum.photos/80/80?random=' + index}
            alt="avatar"
            style={styles.avatarImage}
          />
        </IonAvatar>

        <div style={styles.textContainer}>
          <p style={styles.description}>{description}</p>
          <small style={styles.method}>{method}</small>
        </div>

        <IonLabel slot="end">
          <span style={styles.price}>
            {price}
          </span>
        </IonLabel>
      </IonCardContent>
    </IonCard>
  );
}

export default TransactionCard;
