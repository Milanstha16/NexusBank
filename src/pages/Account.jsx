import React from "react";
import {
  CreditCard,
  Wallet,
  TrendingUp,
  PiggyBank,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
} from "lucide-react";

import {
  mockAccounts,
  mockTransactions,
  formatCurrency,
  formatDateTime,
} from "../data/mockData";

import {
  BankingCard,
  BankingCardHeader,
  BankingCardTitle,
  BankingCardDescription,
} from "../components/banking/BankingCard";

import { StatusBadge } from "../components/banking/StatusBadge";
import { cn } from "../lib/utils";

const getAccountIcon = (type) => {
  switch (type) {
    case "checking":
      return Wallet;
    case "savings":
      return PiggyBank;
    case "investment":
      return TrendingUp;
    case "credit":
      return CreditCard;
    default:
      return Wallet;
  }
};

const getAccountColor = (type) => {
  switch (type) {
    case "checking":
      return "from-primary to-primary/80";
    case "savings":
      return "from-success to-success/80";
    case "investment":
      return "from-accent to-accent/80";
    case "credit":
      return "from-warning to-warning/80";
    default:
      return "from-primary to-primary/80";
  }
};

const Accounts = () => {
  const [selectedAccount, setSelectedAccount] = React.useState(
    mockAccounts[0]?.id || null
  );

  const selectedAccountData = mockAccounts.find(
    (acc) => acc.id === selectedAccount
  );

  const accountTransactions = mockTransactions.filter(
    (txn) => txn.accountId === selectedAccount
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Your Accounts
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and view all your accounts in one place
        </p>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAccounts.map((account) => {
          const Icon = getAccountIcon(account.type);
          const isSelected = selectedAccount === account.id;

          return (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account.id)}
              className={cn(
                "text-left transition-all duration-300",
                isSelected && "ring-2 ring-accent ring-offset-2 rounded-xl"
              )}
            >
              <BankingCard
                variant="elevated"
                padding="none"
                className="overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={cn(
                    "p-6 text-white bg-gradient-to-br",
                    getAccountColor(account.type)
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-6">
                    <p className="text-white/80 text-sm font-medium">
                      {account.name}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {formatCurrency(account.balance)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {account.accountNumber}
                    </span>
                    <StatusBadge status={account.status} />
                  </div>
                </div>

                {account.type === "savings" && account.interestRate && (
                  <div className="px-6 py-3 bg-card border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Interest Rate
                      </span>
                      <span className="font-semibold text-success">
                        {account.interestRate}% APY
                      </span>
                    </div>
                  </div>
                )}

                {account.type === "credit" && account.creditLimit && (
                  <div className="px-6 py-3 bg-card border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Available Credit
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(
                          account.creditLimit + account.balance
                        )}
                      </span>
                    </div>

                    <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warning rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            Math.abs(
                              account.balance / account.creditLimit
                            ) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </BankingCard>
            </button>
          );
        })}
      </div>

      {/* Selected Account Details */}
      {selectedAccountData && (
        <BankingCard variant="default" padding="md">
          <BankingCardHeader>
            <BankingCardTitle>
              {selectedAccountData.name} - Recent Activity
            </BankingCardTitle>
            <BankingCardDescription>
              Last 5 transactions for this account
            </BankingCardDescription>
          </BankingCardHeader>

          {accountTransactions.length > 0 ? (
            <div className="space-y-3">
              {accountTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        transaction.type === "credit"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(transaction.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusBadge status={transaction.status} />
                    <span
                      className={cn(
                        "font-semibold min-w-[100px] text-right",
                        transaction.type === "credit"
                          ? "text-success"
                          : "text-foreground"
                      )}
                    >
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found for this account
            </div>
          )}
        </BankingCard>
      )}
    </div>
  );
};

export default Accounts;
