import { ReactNode, useState, useEffect, useCallback } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionData {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

export interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    try {
      const response = await api.get('/transactions', {
        params: {
          q: query,
          _sort: 'createdAt',
          _order: 'desc',
        },
      })

      setTransactions(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    try {
      const { description, price, type, category } = data

      const response = await api.post('/transactions', {
        description,
        price,
        type,
        category,
        createdAt: new Date().toISOString(),
      })

      setTransactions((prevState) => [response.data, ...prevState])
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
