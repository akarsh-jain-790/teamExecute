import os
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from langchain.llms import HuggingFaceHub
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

data = pd.read_csv("fraud_cases.csv")  
fraud_summary = data.describe(include="all").to_string()

HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")
if not HUGGINGFACE_TOKEN:
    raise ValueError("Missing Hugging Face API token")

llm = HuggingFaceHub(
    repo_id="google/flan-t5-large",  
    model_kwargs={"temperature": 0.3},
    task="text2text-generation",
)

app = FastAPI()

prompt = PromptTemplate(
    input_variables=["transaction_details"],
    template="""
    Given the following fraudulent transaction patterns:
    {fraud_summary}

    Analyze the following transaction and determine if it is fraudulent:
    {transaction_details}

    Respond with 'Fraudulent' or 'Not Fraudulent' along with a brief reason.
    """
).partial(fraud_summary=fraud_summary)

chain = LLMChain(llm=llm, prompt=prompt)

class Transaction(BaseModel):
    transaction_details: str

@app.post("/predict")
def predict_fraud(transaction: Transaction):
    prediction = chain.run(transaction_details=transaction.transaction_details)
    return {"prediction": prediction}