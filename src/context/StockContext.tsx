import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Stock, stockApi } from "../services/api";

interface StockContextType {
  stocks: Stock[];
  loading: boolean;
  error: string | null;
  refreshStocks: () => Promise<void>;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockApi.getAll();
      setStocks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <StockContext.Provider
      value={{
        stocks,
        loading,
        error,
        refreshStocks: fetchStocks,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStocks() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useStocks doit être utilisé dans un StockProvider");
  }
  return context;
}
