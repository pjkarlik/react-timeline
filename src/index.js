import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './Store';

import Timeline from './components/Timeline';
import AppStyles from './styles/global.less';

const Main = () => {
  return (
    <StoreProvider>
      <Timeline className={AppStyles.container} />
    </StoreProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById('react-mount'));
