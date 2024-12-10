import { IonContent, IonPage } from '@ionic/react';
import { ExploreContainer } from '../Tab1/components/ExploreContainer';
import { TabProps } from '../../utils/interfaces';

const Tab2: React.FC<TabProps> = ({ searchQuery, selectedMonth, selectedYear }) => {
  return (
    <ExploreContainer type="Credit" searchQuery={searchQuery} selectedMonth={selectedMonth} selectedYear={selectedYear} />
  );
};

export default Tab2;
