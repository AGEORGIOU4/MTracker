import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/react";
import { googleSignIn } from "./googleSignIn";

export const LoginCard = () => {
  return (
    <IonPage>
      <IonContent>

        <div style={styles.centeredContainer}>
          <IonButton expand="block" onClick={googleSignIn}>
            Sign in with Google
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};


const styles = {
  centeredContainer: {
    minHeight: "100vh", // Use camelCase for CSS properties
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
