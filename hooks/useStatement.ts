'use client';
import { useMemo, useReducer } from 'react';
import type { ParseResult, Transaction } from '../lib/types';

interface State {
  parseResult: ParseResult | null;
  filter: 'all' | 'income' | 'expense';
  search: string;
}

type Action =
  | { type: 'SET_DATA'; payload: ParseResult }
  | { type: 'SET_FILTER'; payload: 'all' | 'income' | 'expense' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'RESET' };

const initialState: State = {
  parseResult: null,
  filter: 'all',
  search: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, parseResult: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useStatement() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredTransactions = useMemo<Transaction[]>(() => {
    if (!state.parseResult) return [];

    return state.parseResult.transactions.filter((t) => {
      if (state.filter !== 'all' && t.type !== state.filter) return false;

      if (state.search) {
        const query = state.search.toLowerCase();

        return (
          t.counterparty.toLowerCase().includes(query) ||
          t.description.toLocaleLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [state.parseResult, state.filter, state.search]);

  return {
    parseResult: state.parseResult,
    filter: state.filter,
    search: state.search,
    filteredTransactions,
    setData: (payload: ParseResult) => dispatch({ type: 'SET_DATA', payload }),
    setFilter: (payload: 'all' | 'income' | 'expense') =>
      dispatch({ type: 'SET_FILTER', payload }),
    setSearch: (payload: string) => dispatch({ type: 'SET_SEARCH', payload }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}
