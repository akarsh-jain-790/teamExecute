### ChakravyuhAI

ChakravyuhAI is a Fraud Detection, Alert, and Monitoring (FDAM) system designed for payment gateways. It combines expert rules with AI models to detect fraudulent transactions in real-time and batch processing. The system also includes fraud reporting, a transaction monitoring dashboard, and an investigation module for fraud cases.

🔗 Live Demo: [ChakravyuhAI](https://v0-fdam-frontend.vercel.app/) 
### Key Features

#### 1. Real-Time Fraud Detection
- The system processes transactions in real-time to identify fraudulent activities.
- Notifications are sent immediately for high-risk transactions.

#### 2. Transaction and Fraud Monitoring Dashboard
- Displays recent transactions and fraud trends.
- Provides advanced analytics for each user profile and the associated risk.
- Users can analyze fraud trends and patterns dynamically.

#### 3. Fraud Reporting
- Allows users to submit suspicious transactions for further investigation.
- Helps improve fraud detection models with real-world data.

#### 4. Fraud Case Investigation
- Displays a list of pending fraud cases for review.
- Enables analysts to investigate and take necessary actions against fraudulent activities.

#### 5. Rule Engine
- Allows users to configure rules for fraud detection without domain knowledge.
- Example Rule: **Velocity Check**
  - **Condition**: Detects multiple transactions from the same user in a short time period.
  - **Logic**: `count(transactions) > 5 AND timespan < 10 minutes`
  - **Action**: Flag for review.
  - **Priority**: 1
  - **Category**: Velocity
  - **Triggers**: 120
  - **Effectiveness**: 95%

#### 6. APIs for Transactions, Rules, Alerts, and Analytics
- The system provides APIs for:
  - Transaction processing.
  - Rule management.
  - Fraud alerts and notifications.
  - Advanced fraud analytics.
- The system takes several parameters as input and returns a fraud classification result.

This solution ensures a comprehensive and efficient approach to fraud detection and management, leveraging AI models and rule-based detection for improved security and reliability.
## Research Papers
The development of this system is supported by research in fraud detection techniques and methodologies. Below are some relevant research papers:

1. [A Hybrid Machine Learning-Based Model for Fraud Detection in Financial Transactions](https://www.sciencedirect.com/science/article/abs/pii/S0045790622000465?utm_source=chatgpt.com)
2. [Identification of Fraudulent Online Transactions and Protection: State-of-the-Art Techniques](https://www.researchgate.net/publication/365880792_Identification_of_Fraudulent_Online_Transactions_and_Protection_State-of-art_Techniques)
3. [Machine Learning-Based Fraud Detection Techniques](https://www.ijnrd.org/papers/IJNRD2303438.pdf#:~:text=In%20this%20paper%2C%20we%20propose%20the%20use%20of,and%20the%20inherent%20imbalanced%20nature%20of%20fraud%20detection.)
4. [Recent Advances in Fraud Detection using Artificial Intelligence](https://jfin-swufe.springeropen.com/articles/10.1186/s40854-023-00470-w?utm_source=chatgpt.com)
