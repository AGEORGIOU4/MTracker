import {
  IonApp,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/main.css';
import { LoginCard } from './auth/LoginCard';
import { DefaultLayout } from './components/DefaultLayout';
import useAuth from './auth/useAuth';

setupIonicReact();


const App: React.FC = () => {
  const user = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        {user ? (
          <DefaultLayout />
        ) : (
          <LoginCard />
        )
        }
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
