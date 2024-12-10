import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  appsOutline,
  cashOutline,
  settingsOutline,
  walletOutline,
} from 'ionicons/icons';

import Tab1 from './pages/Tab1/Tab1';
import Tab2 from './pages/Tab2/Tab2';

import { Admin } from './pages/Admin/Admin';

import MonthYearPicker from './components/MonthYearPicker';
import { useState } from 'react';
import { SearchBar } from './components/SearchBar';

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
import { Header } from './components/Header';
import { Tab3 } from './pages/Tab3/Tab3';
import useAuth from './auth/useAuth';

setupIonicReact();

import { googleSignIn } from './auth/AuthService';

const App: React.FC = () => {
  const user = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
    <IonApp>
      <IonReactRouter>
        {user ? (
          <IonTabs>

            <IonRouterOutlet>

              <Route exact path="/tab1">
                <Header>
                  <SearchBar handleSearch={handleSearch} />
                  <MonthYearPicker onChange={handleDateChange} />
                </Header>
                <Tab1
                  searchQuery={searchQuery}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                />
              </Route>

              <Route exact path="/tab2">
                <Header>
                  <SearchBar handleSearch={handleSearch} />
                  <MonthYearPicker onChange={handleDateChange} />
                </Header>
                <Tab2
                  searchQuery={searchQuery}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                />
              </Route>

              <Route exact path="/tab3">
                <Tab3 />
              </Route>

              <Route exact path="/admin">
                <Header>
                  <IonTitle>Upload Transactions</IonTitle>
                </Header>
                <Admin />
              </Route>

              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={cashOutline} />
                <IonLabel>Debit</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={walletOutline} />
                <IonLabel>Credit</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={appsOutline} />
                <IonLabel>Accounts</IonLabel>
              </IonTabButton>
              <IonTabButton tab="admin" href="/admin">
                <IonIcon icon={settingsOutline} />
                <IonLabel>Admin</IonLabel>
              </IonTabButton>
            </IonTabBar>

          </IonTabs>
        ) : (

          <IonCard style={{ textAlign: "center" }}>
            <IonCardHeader>
              <IonImg style={{ width: "20%" }} src='favicon.png' />
            </IonCardHeader>
            <IonCardContent>

              <IonButton expand='block' onClick={googleSignIn}>Sign in with Google</IonButton>
            </IonCardContent>
          </IonCard>


        )
        }
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
