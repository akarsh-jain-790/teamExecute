from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, text
import os

# ✅ Initialize FastAPI App
app = FastAPI()

# ✅ Database Connection (Use environment variables for security)
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set!")

engine = create_engine(DATABASE_URL)

# ✅ Define Data Model
class Transaction(BaseModel):
    transaction_id: str
    transaction_amount: float
    transaction_timestamp: int
    transaction_channel: str
    payment_gateway_bank: int
    payer_browser: int
    payer_email: str
    payee_ip: str
    payee_id: str
    is_fraud: bool

# ✅ Insert Transaction
@app.post("/insert_transaction")
def insert_transaction(transaction: Transaction):
    try:
        query = """
        INSERT INTO transactions (
            transaction_id, transaction_amount, transaction_timestamp, transaction_channel,
            payment_gateway_bank, payer_browser, payer_email, payee_ip, payee_id, is_fraud
        ) VALUES (
            :transaction_id, :transaction_amount, :transaction_timestamp, :transaction_channel,
            :payment_gateway_bank, :payer_browser, :payer_email, :payee_ip, :payee_id, :is_fraud
        ) ON CONFLICT (transaction_id) DO NOTHING;
        """
        with engine.connect() as conn:
            conn.execute(text(query), transaction.dict())
            conn.commit()
        return {"message": "Transaction inserted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Get All Transactions
@app.get("/get_transactions")
def get_transactions():
    try:
        query = "SELECT * FROM transactions"
        with engine.connect() as conn:
            result = conn.execute(text(query)).fetchall()
        return {"transactions": [dict(row._mapping) for row in result]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Get a Single Transaction
@app.get("/get_transaction/{transaction_id}")
def get_transaction(transaction_id: str):
    try:
        query = "SELECT * FROM transactions WHERE transaction_id = :transaction_id"
        with engine.connect() as conn:
            result = conn.execute(text(query), {"transaction_id": transaction_id}).fetchone()
        if result:
            return {"transaction": dict(result._mapping)}
        else:
            raise HTTPException(status_code=404, detail="Transaction not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
