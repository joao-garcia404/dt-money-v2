import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionData {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
}

export interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    try {
      const response = await api.get("/transactions", {
        params: {
          q: query,
          _sort: "createdAt",
          _order: "desc",
        },
      });

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createTransaction(data: CreateTransactionData) {
    try {
      const { description, price, type, category } = data;

      const response = await api.post("/transactions", {
        description,
        price,
        type,
        category,
        createdAt: new Date().toISOString(),
      });

      setTransactions((prevState) => [response.data, ...prevState]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
