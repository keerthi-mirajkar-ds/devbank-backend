const cors = require("cors");
const express = require("express");

const accounts = [
  {
    id: "CHK-1001",
    type: "Checking",
    balance: 8420.55,
    currency: "USD",
  },
  {
    id: "SVG-2001",
    type: "Savings",
    balance: 15400.0,
    currency: "USD",
  },
];

const transactions = [
  {
    id: "TX-9001",
    merchant: "Payroll Deposit",
    amount: 3200.0,
    direction: "credit",
  },
  {
    id: "TX-9002",
    merchant: "Utility Payment",
    amount: 148.72,
    direction: "debit",
  },
  {
    id: "TX-9003",
    merchant: "Card Purchase",
    amount: 62.15,
    direction: "debit",
  },
];

function createApp() {
  const app = express();
  const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

  app.use(cors({ origin: allowedOrigin }));
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "devbank-backend",
    });
  });

  app.get("/api/summary", (_req, res) => {
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    res.json({
      customer: "Ava Johnson",
      accounts,
      transactions,
      totalBalance,
    });
  });

  return app;
}

module.exports = { createApp };

