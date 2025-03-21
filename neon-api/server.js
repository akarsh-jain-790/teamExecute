const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// ✅ Root Route (Fixes "Cannot GET" issue)
app.get("/", (req, res) => {
  res.send("🚀 Transaction API is running!");
});

// ✅ Store transactions in-memory (for now)
let transactions = [];

// ✅ POST /transactions → Submit a new transaction
app.post("/transactions", (req, res) => {
  const { transaction_id, amount, currency, payer, payee, payment_method, timestamp } = req.body;

  if (!transaction_id || !amount || !currency || !payer || !payee || !payment_method || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const fraud_score = Math.random() * 100; // Simulated fraud score
  const risk_level = fraud_score > 75 ? "high" : fraud_score > 50 ? "medium" : "low";
  const action = risk_level === "high" ? "block" : risk_level === "medium" ? "review" : "approve";

  const newTransaction = {
    transaction_id,
    amount,
    currency,
    payer,
    payee,
    payment_method,
    timestamp,
    fraud_score,
    risk_level,
    action,
    rules_triggered: [
      { rule_id: "R001", name: "High Risk", description: "Transaction flagged due to risk analysis" }
    ]
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// ✅ GET /transactions/:transaction_id → Retrieve a specific transaction
app.get("/transactions/:transaction_id", (req, res) => {
  const transaction = transactions.find(t => t.transaction_id === req.params.transaction_id);
  if (!transaction) return res.status(404).json({ error: "Transaction not found" });
  res.json(transaction);
});

// ✅ GET /transactions → List transactions with filters
app.get("/transactions", (req, res) => {
  let { start_date, end_date, risk_level, status, limit = 20, offset = 0 } = req.query;

  let filteredTransactions = [...transactions];

  if (start_date) filteredTransactions = filteredTransactions.filter(t => new Date(t.timestamp) >= new Date(start_date));
  if (end_date) filteredTransactions = filteredTransactions.filter(t => new Date(t.timestamp) <= new Date(end_date));
  if (risk_level) filteredTransactions = filteredTransactions.filter(t => t.risk_level === risk_level);
  if (status) filteredTransactions = filteredTransactions.filter(t => t.action === status);

  res.json({
    total: filteredTransactions.length,
    limit: Number(limit),
    offset: Number(offset),
    transactions: filteredTransactions.slice(Number(offset), Number(offset) + Number(limit))
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
