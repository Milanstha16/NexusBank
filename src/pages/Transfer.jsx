import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Users, Building2 } from 'lucide-react';
import { mockAccounts, formatCurrency } from '../data/mockData';
import { BankingCard, BankingCardHeader, BankingCardTitle } from '../components/banking/BankingCard';
import { BankingInput } from '../components/banking/BankingInput';
import { BankingButton } from '../components/banking/BankingButton';
import { cn } from '../lib/utils';

const Transfer = () => {
  const [transferType, setTransferType] = useState('internal');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [reference, setReference] = useState('');
  const [formData, setFormData] = useState({
    fromAccount: mockAccounts[0]?.id || '',
    toAccount: '',
    recipientName: '',
    recipientBank: '',
    amount: '',
    description: '',
  });

  const sourceAccounts = mockAccounts.filter(
    (acc) => acc.type !== 'credit' && acc.balance > 0
  );
  const destinationAccounts = mockAccounts.filter(
    (acc) => acc.id !== formData.fromAccount
  );
  const selectedFromAccount = mockAccounts.find(
    (acc) => acc.id === formData.fromAccount
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fromAccount) newErrors.fromAccount = 'Please select a source account';

    if (transferType === 'internal') {
      if (!formData.toAccount) newErrors.toAccount = 'Please select a destination account';
    } else {
      if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name is required';
      if (!formData.toAccount.trim()) newErrors.toAccount = 'Account number is required';
      if (!formData.recipientBank.trim()) newErrors.recipientBank = 'Bank name is required';
    }

    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (selectedFromAccount && amount > selectedFromAccount.balance) {
      newErrors.amount = 'Insufficient funds';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setReference(`TRF-${Date.now().toString().slice(-8)}`);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      fromAccount: mockAccounts[0]?.id || '',
      toAccount: '',
      recipientName: '',
      recipientBank: '',
      amount: '',
      description: '',
    });
    setIsSuccess(false);
    setErrors({});
    setReference('');
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <BankingCard variant="elevated" padding="lg" className="text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Transfer Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Your transfer of {formatCurrency(parseFloat(formData.amount))} has been initiated successfully.
          </p>

          <div className="bg-secondary rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">{formatCurrency(parseFloat(formData.amount))}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">From</span>
              <span className="font-medium">{selectedFromAccount?.name}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Reference</span>
              <span className="font-mono text-sm">{reference}</span>
            </div>
          </div>

          <BankingButton onClick={resetForm} className="w-full">
            Make Another Transfer
          </BankingButton>
        </BankingCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Transfer Money</h1>
        <p className="text-muted-foreground mt-1">Send money securely to anyone, anywhere</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transfer Form */}
        <div className="lg:col-span-2">
          <BankingCard variant="elevated" padding="lg">
            {/* Transfer Type Tabs */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setTransferType('internal')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                  transferType === 'internal'
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                <Users className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Between Accounts</p>
                  <p className="text-xs text-muted-foreground">Transfer to your accounts</p>
                </div>
              </button>

              <button
                onClick={() => setTransferType('external')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                  transferType === 'external'
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                <Building2 className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground">External Transfer</p>
                  <p className="text-xs text-muted-foreground">Send to other banks</p>
                </div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* From Account */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">From Account</label>
                <select
                  value={formData.fromAccount}
                  onChange={(e) => setFormData({ ...formData, fromAccount: e.target.value })}
                  className={cn(
                    "w-full h-12 px-4 rounded-lg bg-background border text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                    errors.fromAccount ? "border-destructive" : "border-input"
                  )}
                >
                  {sourceAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
                {errors.fromAccount && <p className="text-sm text-destructive">{errors.fromAccount}</p>}
              </div>

              {/* To Account / External Details */}
              {transferType === 'internal' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">To Account</label>
                  <select
                    value={formData.toAccount}
                    onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
                    className={cn(
                      "w-full h-12 px-4 rounded-lg bg-background border text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                      errors.toAccount ? "border-destructive" : "border-input"
                    )}
                  >
                    <option value="">Select destination account</option>
                    {destinationAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} - {formatCurrency(account.balance)}
                      </option>
                    ))}
                  </select>
                  {errors.toAccount && <p className="text-sm text-destructive">{errors.toAccount}</p>}
                </div>
              ) : (
                <>
                  <BankingInput
                    label="Recipient Name"
                    placeholder="John Doe"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    error={errors.recipientName}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BankingInput
                      label="Account Number"
                      placeholder="Enter account number"
                      value={formData.toAccount}
                      onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
                      error={errors.toAccount}
                    />
                    <BankingInput
                      label="Bank Name"
                      placeholder="Enter bank name"
                      value={formData.recipientBank}
                      onChange={(e) => setFormData({ ...formData, recipientBank: e.target.value })}
                      error={errors.recipientBank}
                    />
                  </div>
                </>
              )}

              {/* Amount */}
              <BankingInput
                label="Amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                error={errors.amount}
              />

              {/* Description */}
              <BankingInput
                label="Description (optional)"
                placeholder="What's this for?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <BankingButton
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                icon={<Send className="w-4 h-4" />}
              >
                {isLoading ? 'Processing...' : 'Send Money'}
              </BankingButton>
            </form>
          </BankingCard>
        </div>

        {/* Transfer Info */}
        <div className="space-y-6">
          <BankingCard variant="default" padding="md">
            <BankingCardHeader>
              <BankingCardTitle>Transfer Limits</BankingCardTitle>
            </BankingCardHeader>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Limit</span>
                <span className="font-medium">$50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per Transaction</span>
                <span className="font-medium">$25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining Today</span>
                <span className="font-medium text-success">$50,000</span>
              </div>
            </div>
          </BankingCard>

          <BankingCard variant="default" padding="md" className="bg-info/5 border-info/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">Processing Time</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {transferType === 'internal'
                    ? 'Internal transfers are instant and free.'
                    : 'External transfers may take 1-3 business days.'}
                </p>
              </div>
            </div>
          </BankingCard>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
