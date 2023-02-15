import { useContext } from "react";
import { AppContext, AppContextType } from "@lib/contexts/AppContext";

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
