// Mock data for the banking application

export const mockUser = {
  id: '1',
  firstName: 'Alexander',
  lastName: 'Mitchell',
  email: 'alexander.mitchell@email.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '1234 Oak Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'United States',
  },
  dateOfBirth: '1985-06-15',
  memberSince: '2019-03-22',
};

export const mockAccounts = [
  {
    id: 'acc-1',
    type: 'checking',
    name: 'Primary Checking',
    accountNumber: '****4521',
    balance: 24850.75,
    currency: 'USD',
    status: 'active',
  },
  {
    id: 'acc-2',
    type: 'savings',
    name: 'High-Yield Savings',
    accountNumber: '****8932',
    balance: 52340.20,
    currency: 'USD',
    status: 'active',
    interestRate: 4.5,
  },
  {
    id: 'acc-3',
    type: 'investment',
    name: 'Investment Portfolio',
    accountNumber: '****2156',
    balance: 128750.0,
    currency: 'USD',
    status: 'active',
  },
  {
    id: 'acc-4',
    type: 'credit',
    name: 'Premium Credit Card',
    accountNumber: '****7789',
    balance: -2150.3,
    currency: 'USD',
    status: 'active',
    creditLimit: 15000,
  },
];

export const mockTransactions = [
  {
    id: 'txn-1',
    accountId: 'acc-1',
    type: 'debit',
    category: 'transfer',
    description: 'Transfer to Sarah Johnson',
    amount: 500.0,
    currency: 'USD',
    date: '2024-01-28T14:32:00Z',
    status: 'completed',
    recipient: 'Sarah Johnson',
    reference: 'TRF-2024-001',
  },
  {
    id: 'txn-2',
    accountId: 'acc-1',
    type: 'credit',
    category: 'deposit',
    description: 'Salary Deposit',
    amount: 5200.0,
    currency: 'USD',
    date: '2024-01-26T09:00:00Z',
    status: 'completed',
    reference: 'DEP-2024-001',
  },
  {
    id: 'txn-3',
    accountId: 'acc-1',
    type: 'debit',
    category: 'payment',
    description: 'Electric Company',
    amount: 142.5,
    currency: 'USD',
    date: '2024-01-25T16:45:00Z',
    status: 'completed',
  },
  {
    id: 'txn-4',
    accountId: 'acc-1',
    type: 'debit',
    category: 'subscription',
    description: 'Netflix Subscription',
    amount: 15.99,
    currency: 'USD',
    date: '2024-01-24T00:00:00Z',
    status: 'completed',
  },
  {
    id: 'txn-5',
    accountId: 'acc-2',
    type: 'credit',
    category: 'transfer',
    description: 'Transfer from Checking',
    amount: 1000.0,
    currency: 'USD',
    date: '2024-01-23T11:20:00Z',
    status: 'completed',
  },
  {
    id: 'txn-6',
    accountId: 'acc-1',
    type: 'debit',
    category: 'withdrawal',
    description: 'ATM Withdrawal',
    amount: 200.0,
    currency: 'USD',
    date: '2024-01-22T18:30:00Z',
    status: 'completed',
  },
  {
    id: 'txn-7',
    accountId: 'acc-1',
    type: 'credit',
    category: 'refund',
    description: 'Amazon Refund',
    amount: 45.99,
    currency: 'USD',
    date: '2024-01-21T10:15:00Z',
    status: 'completed',
  },
  {
    id: 'txn-8',
    accountId: 'acc-4',
    type: 'debit',
    category: 'payment',
    description: 'Whole Foods Market',
    amount: 87.32,
    currency: 'USD',
    date: '2024-01-20T13:45:00Z',
    status: 'completed',
  },
  {
    id: 'txn-9',
    accountId: 'acc-1',
    type: 'debit',
    category: 'transfer',
    description: 'Transfer to Investment',
    amount: 2500.0,
    currency: 'USD',
    date: '2024-01-19T09:00:00Z',
    status: 'pending',
  },
  {
    id: 'txn-10',
    accountId: 'acc-1',
    type: 'debit',
    category: 'payment',
    description: 'Internet Service',
    amount: 79.99,
    currency: 'USD',
    date: '2024-01-18T00:00:00Z',
    status: 'failed',
  },
];

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

export const formatDateTime = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};
