import React from 'react';
import { IonSearchbar } from '@ionic/react';


function SearchBar() {
  return (
    <>
      <IonSearchbar showCancelButton="focus" className='searchbar'></IonSearchbar>
    </>
  );
}
export default SearchBar;