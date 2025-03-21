// Generate random transaction IDs
const generateTransactionId = () => {
  return `TRX-${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`
}

// Generate random user IDs
const generateUserId = (type: "payer" | "payee") => {
  const prefix = type === "payer" ? "USR" : "MER"
  return `${prefix}-${Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")}`
}

// Generate random payment methods
const paymentMethods = ["Credit Card", "Debit Card", "Bank Transfer", "Digital Wallet", "Crypto"]

// Generate random transaction statuses
const transactionStatuses = ["completed", "pending", "failed", "blocked"]

// Generate a random date within the last 30 days
const generateRandomDate = () => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  return new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime()))
}

// Generate a random amount between 10 and 10000
const generateRandomAmount = () => {
  return Math.floor(Math.random() * 9990) + 10
}

// Generate a random fraud score between 0 and 100
const generateFraudScore = () => {
  return Math.floor(Math.random() * 100)
}

// Generate dummy transactions
export const generateDummyTransactions = (count: number) => {
  const transactions = []

  for (let i = 0; i < count; i++) {
    const fraudScore = generateFraudScore()
    const transaction = {
      id: generateTransactionId(),
      date: generateRandomDate(),
      amount: generateRandomAmount(),
      payerId: generateUserId("payer"),
      payeeId: generateUserId("payee"),
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)] as any,
      fraudScore: fraudScore,
      // Add anomaly flag for some transactions
      anomalyFlag: Math.random() > 0.85 || (fraudScore > 70 && Math.random() > 0.5),
    }

    transactions.push(transaction)
  }

  return transactions
}

