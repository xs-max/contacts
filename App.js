
import * as React from 'react';
import GlobalProvider from './src/context/Provider';
import AppNavContainer from './src/Navigations';


function App() {
  return (
    <GlobalProvider>
      <AppNavContainer/>
    </GlobalProvider>
    
  );
}


export default App;
