import React from 'react';
import { IonSearchbar } from '@ionic/react';

import '../theme/main.css';

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return (
    <>
      <IonSearchbar
        mode='ios'
        showCancelButton="focus"
        className="custom"
        onIonInput={handleSearch} // Pass handleSearch to the onIonInput prop
      />
    </>
  );
};


interface SearchBarProps {
  handleSearch: (event: CustomEvent) => void; // Define the type for the handleSearch function
}