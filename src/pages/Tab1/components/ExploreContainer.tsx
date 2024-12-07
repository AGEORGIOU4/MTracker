import { useEffect, useState } from 'react';
import FloatingButton from '../../../components/FloatingButton';

import MonthYearPicker from '../../../components/MonthYearPicker';
import TransactionsList from './List/TransactionsList';
import { SelectTemplateModal } from './Modals/SelectTemplateModal';
import { EditDetailsModal } from './Modals/EditDetailsModal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { ViewDetailsModal } from './Modals/ViewDetailsModal';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [selectTemplateModalVisible, setSelectTemplateModalVisible] = useState(false);
  const [viewDetailsModalVisible, setViewDetailsModalVisible] = useState(false);
  const [editDetailsModalVisible, setEditDetailsModalVisible] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");


  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]); // Refetch when month or year changes

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      const data: any[] = [];

      querySnapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.date) {
          const date = new Date(transaction.date);
          if (
            (selectedYear && date.getFullYear().toString() === selectedYear) &&
            (selectedMonth ? (date.getMonth() + 1).toString() === selectedMonth : true)
          ) {
            data.push(transaction);
          }
        }
      });

      // Sort the transactions by date in descending order (most recent first)
      const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setItems(sortedData);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleClick = () => {
    setSelectTemplateModalVisible(true);
  }

  const handleSkip = () => {
    handleProceed()
  }

  const handleProceed = () => {
    setSelectTemplateModalVisible(false);
    setEditDetailsModalVisible(true);
  }

  const handleSelectTemplate = (e: any) => {
    handleProceed()
    setSelectedTemplate(e.value);
  }

  const refreshTransactions = () => {
    fetchData()
  }


  return (
    <>
      <MonthYearPicker onChange={handleDateChange} />
      <TransactionsList items={items} loading={loading} error={error} refreshTransactions={refreshTransactions} />
      <FloatingButton handleClick={handleClick} />
      <SelectTemplateModal isOpen={selectTemplateModalVisible} setIsOpen={setSelectTemplateModalVisible} handleSkip={handleSkip} handleSelectTemplate={handleSelectTemplate} />
      <EditDetailsModal isOpen={editDetailsModalVisible} setIsOpen={setEditDetailsModalVisible} selectedTemplate={selectedTemplate} refreshTransactions={refreshTransactions} />
    </>
  );
};

export default ExploreContainer;
