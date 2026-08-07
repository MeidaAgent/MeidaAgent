<div align="center">
  <img src="./public/icon.jpg" alt="Meida Logo" width="120" />
  <h1>Meida Agent Router</h1>
  <p><strong>The Intelligence Routing Layer for Web3 Workflows</strong></p>

  <p>
    <a href="https://github.com/xypherar"><img src="https://img.shields.io/badge/Maintained%20by-Xypherar-blueviolet?style=for-the-badge" alt="Maintained by Xypherar" /></a>
    <img src="https://img.shields.io/badge/Version-2.0.0-neon?style=for-the-badge&color=ccff00" alt="Version 2.0.0" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
  </p>
</div>

<br />

## 🚀 Overview

Meida is an ultra-low latency, intent-based AI routing protocol designed to eliminate API waste and maximize execution speed for on-chain and off-chain autonomous agents. 

Built for high-frequency Web3 applications, Discord bots, and Telegram integrations, Meida intercepts user prompts and instantly routes them to the most cost-effective and capable language model (Llama-3, GPT-4o, Claude 3.5) based on real-time intent analysis.

> **⚠️ NOTE: Core Engine is Proprietary**
> The repository contains the **Open Source Frontend UI** and documentation portal. The underlying **Core Routing Engine** (including the proprietary intent-analysis algorithms and LPU inferences) is closed-source and maintained privately by the Xypherar team. 
> Developers can interface with the routing engine exclusively via the Meida Cloud API or the Edge Gateway SDK.

---

## 🔥 Key Features

- **Intent-Based Routing:** Automatically classifies requests (Trivial, General, Complex) and directs them to the optimal endpoint.
- **Sub-50ms Latency:** Engineered for zero-lag interactions required by algorithmic trading bots and real-time support.
- **100% OpenAI Compatible:** Drop-in replacement for existing OpenAI SDKs. No new syntax to learn.
- **Cost Optimization:** Proven to reduce unnecessary API token expenditure by up to ~60%.
- **Native Web3 Tooling:** Pre-configured to execute real-time DEX price checks, contract analysis, and token liquidity queries.

---

## 🛠️ Quick Start

### 1. Install the SDK
Deploy the routing gateway locally on your infrastructure:
```bash
npm install @meida/router
```

### 2. Initialize Network Configuration
Connect your gateway to the central intelligence hub:
```bash
meida init --network base --api-key YOUR_MEIDA_API_KEY
```

### 3. Start the Edge Gateway
Initialize the listener on your preferred port:
```bash
meida gateway start --port 3000
```

---

## 🌐 Connecting via Cloud API (cURL)

If you prefer not to host the Edge Gateway, you can communicate directly with the Meida Cloud API using standard OpenAI specifications:

```bash
curl https://api.meida.cloud/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MEIDA_API_KEY" \
  -d '{
    "model": "auto-route",
    "messages": [
      { "role": "user", "content": "Analyze liquidity depth across decentralized orderbooks." }
    ]
  }'
```

---

## 🔒 Requesting Access (Closed Beta)

The Meida Cloud API and Edge Gateway are currently in **Closed Beta**. To acquire a `$MEIDA_API_KEY`, please join the waitlist through our primary portal.

[👉 Join the API Waitlist](https://meida.cloud/docs)

---

## 💻 Running the UI Dashboard (Local Development)

To run this open-source dashboard/UI locally:

```bash
# Clone the repository
git clone https://github.com/MeidaAgent/MeidaAgent.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

Navigate to `http://localhost:3000` to view the UI.

---

<div align="center">
  <i>Engineered with absolute precision by the Xypherar Team.</i>
</div>
