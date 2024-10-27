import { createContext, useContext } from "react";

const CenterRefContext = createContext(null);

export const useCenterRef = () => useContext(CenterRefContext);

export const CenterRefProvider = ({ children, centerRef }) => {
  return (
    <CenterRefContext.Provider value={centerRef}>
      {children}
    </CenterRefContext.Provider>
  );
};

// * had to put useRef here because when i was doing it directly in profile compoenent i needed to wrap whole code of profile in div which maked two scrollbars there and make whole css a mess so i put it here and now i can use it in both profile and Center component
