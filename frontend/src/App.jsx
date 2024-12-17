import React from 'react'
import Loader from './components/Loader'
import Header from './components/Header'
import ErrorScreen from './components/ErrorScreen'
import Main from './components/Main'

const App = () => {
  return (
    <div className="app">

      <Header />
      <Main>
        <Loader />
        <ErrorScreen />
      </Main>

    </div >
  )
}

export default App