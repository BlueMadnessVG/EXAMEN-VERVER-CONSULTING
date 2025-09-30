/**
 * Interface defining the shape of the Modal context.
 * 
 * @interface ModalContextType
 * @property {boolean} state - The current visibility state of the modal (true = open, false = closed)
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setsState - Function to update the modal's visibility state
 */

import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Default context values for the Modal context.
 * Used as fallback when context is consumed outside of a ModalProvider.
 * 
 * @constant {ModalContextType} defaultModalContext
 * @default
 */
const defaultModalContext: ModalContextType = {
  state: false,
  setState: () => null,
};

/**
 * React context for managing modal state across components.
 * Provides a centralized way to control modal visibility and state.
 * 
 * @constant {React.Context<ModalContextType>} ModalContext
 */
export const ModalContext =
  createContext<ModalContextType>(defaultModalContext);

/**
 * Props for the ModalProvider component.
 * 
 * @interface ModalProps
 * @property {ReactNode} children - React children nodes that will have access to the modal context
 */
interface ModalProps {
  children: ReactNode;
}

/**
 * Provider component that wraps part of the component tree to provide modal state management.
 * Manages the modal's open/close state and makes it available to all descendant components
 * via the useModalContext hook.
 * 
 * @component
 * @param {ModalProps} props - Component props
 * @param {ReactNode} props.children - Child components that will consume the modal context
 * @returns {JSX.Element} Context provider component
 */
export const ModalProvider = ({ children }: ModalProps) => {
  const [state, setState] = useState(false);

  return (
    <ModalContext.Provider value={{ state, setState }}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * Custom hook to access the modal context.
 * Provides the current modal state and setter function for updating it.
 * Must be used within a ModalProvider component.
 * 
 * @throws {Error} If used outside of a ModalProvider
 * 
 * @returns {ModalContextType} The modal context containing state and setsState
 */
export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalContext must be use withing a ModalContextProvider");
  }

  return context;
};
