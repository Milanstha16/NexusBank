import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Download,
  Calendar,
} from 'lucide-react';
import {
  mockTransactions,
  mockAccounts,
  formatCurrency,
  formatDateTime,
} from '../data/mockData';
import { BankingCard } from '../components/banking/BankingCard';
import { BankingInput } from '../components/banking/BankingInput';
import { BankingButton } from '../components/banking/BankingButton';
import { StatusBadge } from '../components/banking/StatusBadge';
import { cn } from '../lib/utils';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState('all');

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      // Search filter
      if (
        searchQuery &&
        !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) return false;

      // Type filter
      if (typeFilter !== 'all' && transaction.type !== typeFilter) return false;

      // Status filter
      if (statusFilter !== 'all' && transaction.status !== statusFilter) return false;

      // Account filter
      if (selectedAccount !== 'all' && transaction.accountId !== selectedAccount)
        return false;

      return true;
    });
  }, [searchQuery, typeFilter, statusFilter, selectedAccount]);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'debit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Transaction History
          </h1>
          <p className="text-muted-foreground mt-1">
            View and filter all your transactions
          </p>
        </div>
        <BankingButton variant="outline" icon={<Download className="w-4 h-4" />}>
          Export
        </BankingButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BankingCard variant="default" padding="md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <ArrowDownLeft className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-xl font-bold text-success">
                +{formatCurrency(totalIncome)}
              </p>
            </div>
          </div>
        </BankingCard>

        <BankingCard variant="default" padding="md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-xl font-bold text-destructive">
                -{formatCurrency(totalExpenses)}
              </p>
            </div>
          </div>
        </BankingCard>

        <BankingCard variant="default" padding="md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="text-xl font-bold text-foreground">
                {filteredTransactions.length}
              </p>
            </div>
          </div>
        </BankingCard>
      </div>

      {/* Filters */}
      <BankingCard variant="default" padding="md">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <BankingInput
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            {['all', 'credit', 'debit'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  typeFilter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {type === 'all' ? 'All' : type === 'credit' ? 'Income' : 'Expenses'}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium border-none outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Account Filter */}
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium border-none outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Accounts</option>
            {mockAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
      </BankingCard>

      {/* Transactions List */}
      <BankingCard variant="default" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          transaction.type === 'credit'
                            ? 'bg-success/10 text-success'
                            : 'bg-destructive/10 text-destructive'
                        )}
                      >
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-muted-foreground sm:hidden">
                          {formatDateTime(transaction.date)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground capitalize">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {formatDateTime(transaction.date)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={cn(
                        "font-semibold",
                        transaction.type === 'credit'
                          ? 'text-success'
                          : 'text-foreground'
                      )}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No transactions found matching your filters
            </div>
          )}
        </div>
      </BankingCard>
    </div>
  );
};

export default Transactions;
