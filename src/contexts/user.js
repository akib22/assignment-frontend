import { createContext, useReducer, useContext } from 'react';

const UserCounter = createContext();

function UserProvider({
  initialState = { user: null, accessToken: null, wishlists: [] },
  ...props
}) {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case 'setUser': {
        return { ...state, ...payload };
      }

      case 'setWishlists': {
        return { ...state, ...payload };
      }

      case 'reset': {
        return { user: null, accessToken: null, wishlists: null };
      }

      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }
  }, initialState);

  const value = [state, dispatch];

  return <UserCounter.Provider value={value} {...props} />;
}

function useUser() {
  const context = useContext(UserCounter);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
