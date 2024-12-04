import { useState } from 'react';
import FloatingButton from '../../../components/FloatingButton';

import MonthYearPicker from '../../../components/MonthYearPicker';
import Modal from './Modals/Modal';
import InfiniteList from './List/InfiniteList';
import { SelectTemplateModal } from './Modals/SelectTemplateModal';
import { DetailsModal } from './Modals/DetailsModal';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [selectTemplateModalVisible, setSelectTemplateModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const handleClick = () => {
    setSelectTemplateModalVisible(true);
  }

  const handleSkip = () => {
    setSelectTemplateModalVisible(false);
    setDetailsModalVisible(true);
  }

  return (
    <>
      <MonthYearPicker />
      <InfiniteList />
      <FloatingButton handleClick={handleClick} />
      <SelectTemplateModal isOpen={selectTemplateModalVisible} setIsOpen={setSelectTemplateModalVisible} handleSkip={handleSkip} />
      <DetailsModal isOpen={detailsModalVisible} setIsOpen={setDetailsModalVisible} />
    </>
  );
};

export default ExploreContainer;
