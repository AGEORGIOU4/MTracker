import { useEffect, useState } from 'react';

import MonthYearPicker from '../../../components/MonthYearPicker';
import TransactionsList from './List/TransactionsList';
import { SelectTemplateModal } from './Modals/SelectTemplateModal';
import { EditDetailsModal } from './Modals/EditDetailsModal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { FloatingButton } from '../../../components/FloatingButton';

export const ExploreContainer: React.FC<ContainerProps> = ({ type, searchQuery }) => {
  const [selectTemplateModalVisible, setSelectTemplateModalVisible] = useState(false);
  const [viewDetailsModalVisible, setViewDetailsModalVisible] = useState(false);
  const [editDetailsModalVisible, setEditDetailsModalVisible] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const filtered = items.filter((item) => {
      return (
        item.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredItems(filtered);

  }, [searchQuery]);

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
          if ((selectedYear && date.getFullYear().toString() === selectedYear) &&
            (selectedMonth ? (date.getMonth() + 1).toString() === selectedMonth : true)) {
            if (type === transaction.type) {
              data.push(transaction);
            }
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
      <TransactionsList type={type} items={searchQuery.length > 2 ? filteredItems : items} loading={loading} error={error} refreshTransactions={refreshTransactions} />
      <FloatingButton handleClick={handleClick} />
      <SelectTemplateModal type={type} isOpen={selectTemplateModalVisible} setIsOpen={setSelectTemplateModalVisible} handleSkip={handleSkip} handleSelectTemplate={handleSelectTemplate} />
      <EditDetailsModal type={type} isOpen={editDetailsModalVisible} setIsOpen={setEditDetailsModalVisible} selectedTemplate={selectedTemplate} refreshTransactions={refreshTransactions} />
    </>
  );
};

interface ContainerProps {
  type: string;
  searchQuery: string;
}
