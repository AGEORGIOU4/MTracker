import { ExploreContainer } from './components/ExploreContainer';
import { TabProps } from '../../utils/interfaces';

const Tab1: React.FC<TabProps> = ({ searchQuery, selectedMonth, selectedYear }) => {
  return (
    <>
      <ExploreContainer type="All" searchQuery={searchQuery} selectedMonth={selectedMonth} selectedYear={selectedYear} />
    </>
  );
};

export default Tab1;



