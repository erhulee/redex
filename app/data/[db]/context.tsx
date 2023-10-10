import { createContext, useContext } from "react";
export const context = createContext({
  key: "",
  db: 0,
});

export const EnvContextProvider = context.Provider;
export function useEnv() {
  const { key, db } = useContext(context);
  return {
    key,
    db,
  };
}
