import React, { useState } from 'react';
import { IonAvatar, IonCard, IonCardContent, IonImg, IonLabel } from '@ionic/react';
import { getMethodPhoto } from '../../../utils/options';

export const AccountCard: React.FC<AccountCardProps> = ({ id, bank, accountName, accountNumber, accountType, user, balance }) => {

  return (
    <>
      <IonCardContent style={styles.cardContent}>

        <div style={styles.textContainer}>
          <p style={styles.accountName}>{accountName?.toUpperCase()}</p>
          <small style={styles.accountType}>{accountType}</small>
          <br />
          <small style={styles.accountNumber}>{accountNumber}</small>
        </div>

        <IonLabel slot="end" style={styles.label}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            width: '100%'
          }}>
            <IonImg style={styles.bank} src={getMethodPhoto(bank)} />
            <span style={styles.amount}>
              {balance}
            </span>
          </div>
        </IonLabel>
      </IonCardContent>
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

  textContainer: {
    flex: 1
  },
  accountType: {
    backgroundColor: "#ffd6b6",
    color: "#602a00",
    borderRadius: "20px",
    fontWeight: "500",
    fontSize: "14px",
    margin: "4px 0",
    padding: "0px 10px",
    display: "inline-block",
  },
  accountName: {
    color: '#000',
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
  accountNumber: {
    fontSize: '12px',
    color: '#555',
  },
  amount: {
    marginTop: '10px',
    fontSize: '15px',
    color: '#000',
    whiteSpace: 'nowrap',
  },
};

interface AccountCardProps {
  id: string;
  accountName: string | undefined;
  bank: string | undefined;
  accountNumber: string;
  accountType: string;
  user: string;
  balance: string | number;
}