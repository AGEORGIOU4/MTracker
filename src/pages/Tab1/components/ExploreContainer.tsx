import './ExploreContainer.css';
import FloatingButton from './FloatingButton';
import InfiniteList from './InfiniteList';
import MonthYearPicker from './MonthYearPicker';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <>
      <MonthYearPicker />
      <FloatingButton />
      <InfiniteList />
    </>
  );
};

export default ExploreContainer;
