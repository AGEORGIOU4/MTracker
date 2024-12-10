import { IonHeader, IonToolbar } from "@ionic/react"

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          {children}
        </IonToolbar>
      </IonHeader>
    </>
  )
}


interface HeaderProps {
  children?: React.ReactNode;
}