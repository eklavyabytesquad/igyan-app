/**
 * iGyan App - Side Navigation Context
 * Manages global side navigation state across the app
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

const SideNavContext = createContext();

export function SideNavProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSideNav = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSideNav = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleSideNav = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = {
    isOpen,
    openSideNav,
    closeSideNav,
    toggleSideNav,
  };

  return (
    <SideNavContext.Provider value={value}>
      {children}
    </SideNavContext.Provider>
  );
}

export function useSideNav() {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error('useSideNav must be used within a SideNavProvider');
  }
  return context;
}

export default SideNavContext;
