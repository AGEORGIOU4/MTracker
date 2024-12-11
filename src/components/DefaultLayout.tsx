import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
} from '@ionic/react';
import {
  appsOutline,
  cashOutline,
  repeatOutline,
  settingsOutline,
  walletOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import MonthYearPicker from './MonthYearPicker';
import Tab1 from '../pages/Tab1/Tab1';
import Tab2 from '../pages/Tab2/Tab2';
import { Tab3 } from '../pages/Tab3/Tab3';
import { Admin } from '../pages/Admin/Admin';


export const DefaultLayout = () => {

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
          <IonIcon icon={repeatOutline} />
          <IonLabel>Transactions</IonLabel>
        </IonTabButton>

        {/* <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={walletOutline} />
          <IonLabel>Credit</IonLabel>
        </IonTabButton> */}

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
  )
}