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
      <IonContent fullscreen className="ion-justify-content-center ion-align-items-center">
        <IonCard className="ion-text-center" style={{ maxWidth: "400px" }}>
          <IonCardHeader>
            <IonRow className="ion-justify-content-center ion-align-items-center">
              <IonCol size="2">
                <IonImg src="favicon.png" />
              </IonCol>

              <IonCol>
                <IonCardTitle>mTracker</IonCardTitle>
                <IonCardSubtitle>Track your Accounts seamlessly</IonCardSubtitle>
              </IonCol>
            </IonRow>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block" onClick={googleSignIn}>
              Sign in with Google
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
