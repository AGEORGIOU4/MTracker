import React, { useState, useEffect } from 'react';
import { IonItem, IonList, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { calendar, eye, leaf } from 'ionicons/icons';

function MonthYearPicker() {
  // State to store selected month and year
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Get the current month and year
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed, so adding 1
  const currentYear = new Date().getFullYear();

  // Create arrays for months and years
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years: string[] = [];
  for (let i = 0; i < 12; i++) {
    years.push((currentYear - i).toString());
  }

  useEffect(() => {
    setSelectedMonth(currentMonth.toString().padStart(2, '0')); // Default to current month
    setSelectedYear(currentYear.toString()); // Default to current year
  }, [currentMonth, currentYear]);

  return (
    <IonList >

      <IonGrid>
        <IonRow>
          <IonCol size='6'>


            <IonItem >
              <IonSelect

                interface="modal"
                aria-label="Month"
                value={selectedMonth}
                onIonChange={(e) => setSelectedMonth(e.detail.value)}
              >
                {months.map((month) => (
                  <IonSelectOption key={month.value} value={month.value} >
                    {month.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

          </IonCol>

          <IonCol size='6'>
            <IonItem>
              <IonSelect
                interface="modal"
                aria-label="Year"
                value={selectedYear}
                onIonChange={(e) => setSelectedYear(e.detail.value)}
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
