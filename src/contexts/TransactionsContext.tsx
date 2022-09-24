import { createContext, ReactNode, useState, useEffect } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export interface TransactionsContextType {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function handleGetTransactions() {
    try {
      const response = await fetch("http://localhost:3333/transactions");
      const data = await response.json();

      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions: transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
