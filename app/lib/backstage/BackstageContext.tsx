import { createContext, useContext } from "react";

export interface IBackstageContext {
  navigation: any;
  locations: any;
  website: any;
  alerts: any;
}

export const BackstageContext = createContext<IBackstageContext | null>(null);

export const BackstageProvider = BackstageContext.Provider;

export function useBackstage(): IBackstageContext | null {
  const context = useContext(BackstageContext);

  if (context === undefined) {
    throw new Error("useBackstage must be used within a BackstageProvider");
  }

  return context;
}
