import { createContext, useContext, useState, useCallback } from 'react';
import LoadingBar from '../components/loading-bar/LoadingBar';

const LoadingBarContext = createContext();

export function LoadingBarProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const showLoadingBar = useCallback(() => setIsVisible(true), []);
  const hideLoadingBar = useCallback(() => setIsVisible(false), []);

  return (
    <LoadingBarContext.Provider value={{ isVisible, showLoadingBar, hideLoadingBar }}>
      {isVisible && <LoadingBar />}
      {children}
    </LoadingBarContext.Provider>
  );
}

export function useLoadingBar() {
  return useContext(LoadingBarContext);
}
