import { useEffect, useState } from 'react';

import MonthYearPicker from '../../../components/MonthYearPicker';
import TransactionsList from './List/TransactionsList';
import { SelectTemplateModal } from './Modals/SelectTemplateModal';
import { CreateTransactionModal } from './Modals/CreateTransactionModal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import { FloatingButton } from '../../../components/FloatingButton';

export const ExploreContainer: React.FC<ContainerProps> = ({ type, searchQuery, selectedMonth, selectedYear }) => {
  const [selectTemplateModalVisible, setSelectTemplateModalVisible] = useState(false);
  const [editDetailsModalVisible, setEditDetailsModalVisible] = useState(false);

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
    fetchItems();
  }, [selectedMonth, selectedYear]);

  const fetchItems = async () => {
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
            data.push(transaction);
          }

        }
      });

      const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setItems(sortedData);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions. Please try again later.');
    } finally {
      setLoading(false);
    }
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
    fetchItems()
  }


  return (
    <>
      <FloatingButton handleClick={handleClick} />
      <TransactionsList type={type} items={searchQuery.length > 2 ? filteredItems : items} loading={loading} error={error} refreshTransactions={refreshTransactions} />
      <SelectTemplateModal type={type} isOpen={selectTemplateModalVisible} setIsOpen={setSelectTemplateModalVisible} handleSkip={handleSkip} handleSelectTemplate={handleSelectTemplate} />
      <CreateTransactionModal type={type} isOpen={editDetailsModalVisible} setIsOpen={setEditDetailsModalVisible} selectedTemplate={selectedTemplate} refreshTransactions={refreshTransactions} />
    </>
  );
};

interface ContainerProps {
  type: string;
  searchQuery: string;
  selectedMonth: any;
  selectedYear: any;
}
