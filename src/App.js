import React, { useEffect } from 'react';
import Home from './containers/Home';

const App = () => {

  useEffect(() => {
    // disable long press context menu 
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false
    }

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Home />
  );
}

export default App;