import React, {useState} from 'react';

import ChangeNavigationService from '../services/ChangeNavigationService';

import AllPages from './AllPages';
import HomePage from './HomePage';

export default function Routes() {
  const [showHomeState, setShowHomeState] = useState('false');

  ChangeNavigationService.checkShowHome(1)
    .then(databaseRow => {
      setShowHomeState(databaseRow.showHome);
    })
    .catch(err => console.log(err));

  return <>{showHomeState === 'true' ? <HomePage /> : <AllPages />}</>;
}
