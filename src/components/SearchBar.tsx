import React from 'react';
import { IonSearchbar } from '@ionic/react';

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return (
    <>
      <IonSearchbar
        showCancelButton="focus"
        className="searchbar"
        onIonInput={handleSearch} // Pass handleSearch to the onIonInput prop
      />
    </>
  );
};


interface SearchBarProps {
  handleSearch: (event: CustomEvent) => void; // Define the type for the handleSearch function
}