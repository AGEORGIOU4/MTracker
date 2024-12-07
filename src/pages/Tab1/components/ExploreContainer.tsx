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

  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleClick = () => {
    setSelectTemplateModalVisible(true);
  }

  const handleSkip = () => {
    handleProceed()
  }

  const handleProceed = () => {
    setSelectTemplateModalVisible(false);
    setDetailsModalVisible(true);
  }

  const handleSelectTemplate = (e: any) => {
    handleProceed()
    setSelectedTemplate(e.value);
  }



  return (
    <>
      <MonthYearPicker />
      <InfiniteList />
      <FloatingButton handleClick={handleClick} />
      <SelectTemplateModal isOpen={selectTemplateModalVisible} setIsOpen={setSelectTemplateModalVisible} handleSkip={handleSkip} handleSelectTemplate={handleSelectTemplate} />
      <DetailsModal isOpen={detailsModalVisible} setIsOpen={setDetailsModalVisible} selectedTemplate={selectedTemplate} />
    </>
  );
};

export default ExploreContainer;
