import React from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Download,
  CreditCard,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../context/useAuth";
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
} from "../components/banking/BankingCard";

import { BankingButton } from "../components/banking/BankingButton";
import { StatusBadge } from "../components/banking/StatusBadge";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Dashboard = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = React.useState(true);

  const totalBalance = mockAccounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );

  const recentTransactions = mockTransactions.slice(0, 5);

  const quickActions = [
    { icon: Send, label: "Transfer", path: "/transfer", color: "bg-accent" },
    { icon: Download, label: "Deposit", path: "/transfer", color: "bg-success" },
    {
      icon: ArrowUpRight,
      label: "Withdraw",
      path: "/transfer",
      color: "bg-warning",
    },
    { icon: CreditCard, label: "Cards", path: "/accounts", color: "bg-info" },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {getGreeting()}, {user?.firstName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your finances
          </p>
        </div>

        <Link to="/transfer">
          <BankingButton icon={<Send className="w-4 h-4" />}>
            Send Money
          </BankingButton>
        </Link>
      </div>

      {/* Balance Card */}
      <BankingCard
        variant="elevated"
        padding="lg"
        className="gradient-primary text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary-foreground/80 text-sm font-medium">
              Total Balance
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {showBalance ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex items-end gap-4">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight">
              {showBalance
                ? formatCurrency(totalBalance)
                : "••••••••"}
            </span>

            <div className="flex items-center gap-1 text-success bg-success/20 px-2 py-1 rounded-full text-sm mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>+2.5%</span>
            </div>
          </div>

          <p className="text-primary-foreground/60 text-sm mt-2">
            Across {mockAccounts.length} accounts
          </p>
        </div>
      </BankingCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.label} to={action.path} className="group">
            <BankingCard
              variant="default"
              padding="md"
              className="flex flex-col items-center gap-3 hover:shadow-medium transition-all duration-200 hover:-translate-y-1"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110",
                  action.color
                )}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {action.label}
              </span>
            </BankingCard>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts Overview */}
        <div className="lg:col-span-1">
          <BankingCard variant="default" padding="md">
            <BankingCardHeader>
              <div className="flex items-center justify-between">
                <BankingCardTitle>Your Accounts</BankingCardTitle>
                <Link
                  to="/accounts"
                  className="text-sm text-accent hover:underline font-medium"
                >
                  View all
                </Link>
              </div>
            </BankingCardHeader>

            <div className="space-y-3">
              {mockAccounts.slice(0, 3).map((account) => (
                <Link
                  key={account.id}
                  to="/accounts"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        account.type === "checking" &&
                          "bg-primary/10 text-primary",
                        account.type === "savings" &&
                          "bg-success/10 text-success",
                        account.type === "investment" &&
                          "bg-accent/10 text-accent",
                        account.type === "credit" &&
                          "bg-warning/10 text-warning"
                      )}
                    >
                      <CreditCard className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {account.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {account.accountNumber}
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-semibold text-sm",
                      account.balance < 0
                        ? "text-destructive"
                        : "text-foreground"
                    )}
                  >
                    {formatCurrency(account.balance)}
                  </span>
                </Link>
              ))}
            </div>
          </BankingCard>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <BankingCard variant="default" padding="md">
            <BankingCardHeader>
              <div className="flex items-center justify-between">
                <BankingCardTitle>
                  Recent Transactions
                </BankingCardTitle>
                <Link
                  to="/transactions"
                  className="text-sm text-accent hover:underline font-medium"
                >
                  View all
                </Link>
              </div>
            </BankingCardHeader>

            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
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
                      <p className="text-sm font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(transaction.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={transaction.status} />
                    <span
                      className={cn(
                        "font-semibold",
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
          </BankingCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
