import React, { useState, useEffect } from 'react';
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { months } from '../utils/months';

const styles = {
  list: {
    marginBottom: '10px',
  },
};

interface MonthYearPickerProps {
  onChange: (selectedMonth: string, selectedYear: string) => void;
}

function MonthYearPicker({ onChange }: MonthYearPickerProps) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const years: string[] = [];
  for (let i = 0; i < 12; i++) {
    years.push((currentYear - i).toString());
  }

  useEffect(() => {
    const month = currentMonth.toString().padStart(2, '0');
    const year = currentYear.toString();
    setSelectedMonth(month);
    setSelectedYear(year);
    onChange(month, year);
  }, []);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    onChange(value, selectedYear);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    onChange(selectedMonth, value);
  };

  return (
    <IonList style={styles.list}>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonItem>
              <IonSelect
                interface="modal"
                aria-label="Month"
                value={selectedMonth}
                onIonChange={(e) => handleMonthChange(e.detail.value)}
              >
                {months.map((month) => (
                  <IonSelectOption key={month.value} value={month.value}>
                    {month.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>

          <IonCol size="6">
            <IonItem>
              <IonSelect
                interface="modal"
                aria-label="Year"
                value={selectedYear}
                onIonChange={(e) => handleYearChange(e.detail.value)}
              >
                {years.map((year) => (
                  <IonSelectOption key={year} value={year}>
                    {year}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
}

export default MonthYearPicker;
