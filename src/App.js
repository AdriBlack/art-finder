import React from 'react';
import styled from 'styled-components'
import GlobalStyle from './GlobalStyles'

import DropDownMenu from './Components/DropDownMenu'

const CurrencyContainer = styled.div`
  padding
`

const PageTitle = styled.h1`
  padding: 1rem;
`
function App() {
  return (
    <>
      <GlobalStyle />
      <body>
        <CurrencyContainer>
          <PageTitle>Currency Converter</PageTitle>
          <DropDownMenu />
        </CurrencyContainer>
      </body>
    </>
  );
}

export default App;
