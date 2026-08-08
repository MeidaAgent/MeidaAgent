<div align="center">
  <img src="./public/meidalogo-removebg.png" alt="Meida Agent Logo" width="100" />
  <h1>Meida Agent Router</h1>
  <p><strong>Sub-50ms Intelligent AI Gateway with Zero-Downtime Failover & 100% OpenAI SDK Drop-in Compatibility</strong></p>

  <p>
    <a href="https://meida.cloud"><img src="https://img.shields.io/badge/Website-meida.cloud-000000?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website" /></a>
    <a href="https://meida.cloud/docs"><img src="https://img.shields.io/badge/Documentation-Portal-111111?style=for-the-badge&logo=gitbook&logoColor=white" alt="Docs" /></a>
    <a href="https://x.com/MeidaAgent"><img src="https://img.shields.io/badge/Twitter-@MeidaAgent-000000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter / X" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Latency-%3C50ms-ccff00?style=flat-square&labelColor=111111&color=a8e600" alt="Sub-50ms Latency" />
    <img src="https://img.shields.io/badge/Compatibility-OpenAI%20100%25-blue?style=flat-square&labelColor=111111" alt="OpenAI Compatible" />
    <img src="https://img.shields.io/badge/Failover-Zero--Downtime-emerald?style=flat-square&labelColor=111111" alt="Zero-Downtime Failover" />
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs&labelColor=111111" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/License-MIT-gray?style=flat-square&labelColor=111111" alt="License MIT" />
  </p>

  <p>
    <a href="#overview">Overview</a> •
    <a href="#routing-strategies">Routing Strategies</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#drop-in-sdk-integration">SDK Integration</a> •
    <a href="#benchmarks">Benchmarks</a> •
    <a href="#local-development">Local Development</a> •
    <a href="https://meida.cloud/docs">Full Docs</a>
  </p>
</div>

<br />

---

## Overview

**Meida Agent Router** is an enterprise-grade, high-throughput AI routing gateway engineered for autonomous agents, Web3 applications, and mission-critical production systems.

Rather than locking your infrastructure into a single model provider or suffering from unannounced upstream outages and rate limits, Meida acts as an edge-distributed proxy that dynamically evaluates request complexity, provider health, token pricing, and latency metrics in real time—routing each prompt to the optimal endpoint in **under 50 milliseconds**.

```
                        ┌──────────────────────────────┐
                        │   Autonomous Agent Client    │
                        └──────────────┬───────────────┘
                                       │ (OpenAI SDK / cURL)
                                       ▼
                        ┌──────────────────────────────┐
                        │   Meida Intelligent Router   │
                        │    (Sub-50ms Intent Engine)  │
                        └──────┬────────┬────────┬─────┘
                               │        │        │
            ┌──────────────────┘        │        └──────────────────┐
            ▼                           ▼                           ▼
  ┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
  │   Anthropic      │        │     OpenAI       │        │    DeepSeek /    │
  │ Claude 3.5 Sonnet│        │     GPT-4o       │        │     Llama-3      │
  └──────────────────┘        └──────────────────┘        └──────────────────┘
```

---

## Key Capabilities

* **Sub-50ms Intent Routing:** Microsecond prompt classification (Trivial, Code Synthesis, Complex Reasoning, Multimodal) with automated tier dispatching.
* **Zero-Downtime Circuit Breaking:** Instant health telemetry detecting upstream outages (`500`, `502`, `503`) or rate limits (`429`) and failing over in `< 12ms`.
* **100% Drop-In OpenAI Compatibility:** Change just one line of code (`baseURL="https://api.meida.cloud/v1"`). No new SDKs or syntax migrations required.
* **Token Cost Arbitrage:** Automatically minimizes compute overhead by matching task difficulty to optimal model tiers—reducing monthly token expenditure by up to **~65%**.
* **Edge-Distributed Mesh:** Deployed across global points of presence to ensure sub-millisecond edge TLS termination and caching.

---

## Routing Strategies

Meida supports 4 production routing modes out of the box:

| Strategy | Target Use Case | Default Fallback Chain | Avg Latency |
| :--- | :--- | :--- | :--- |
| `arbitrage-fastest` | Real-time bots, trading systems, UI copilots | `Llama-3.3` → `GPT-4o-mini` → `Claude 3.5 Haiku` | **~42ms** |
| `cost-optimal` | High-volume batch queries, data scraping | `DeepSeek-V3` → `GPT-4o-mini` → `Mistral-Large` | **~68ms** |
| `reasoning-heavy` | Smart contract auditing, mathematical proofs | `Claude 3.5 Sonnet` → `DeepSeek-R1` → `o1-preview` | **~180ms** |
| `high-availability` | Mission-critical financial & banking services | Multi-provider active-active round robin | **~50ms** |

---

## Quick Start

### Direct REST API (cURL)

Send requests to the Meida gateway using standard OpenAI format:

```bash
curl https://api.meida.cloud/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MEIDA_API_KEY" \
  -d '{
    "model": "auto-route",
    "messages": [
      { "role": "system", "content": "You are a specialized Web3 intelligence agent." },
      { "role": "user", "content": "Evaluate cross-chain liquidity depth across Uniswap and Curve." }
    ],
    "temperature": 0.2
  }'
```

---

## Drop-In SDK Integration

### Python (OpenAI SDK)

```python
from openai import OpenAI

# 1. Swap only base_url and use your Meida API Key:
client = OpenAI(
    base_url="https://api.meida.cloud/v1",
    api_key="me_live_xxxxxxxxxxxxxxxx"
)

# 2. Keep 100% of your existing logic unchanged:
response = client.chat.completions.create(
    model="auto-route",  # Meida intelligently handles model selection & failover
    messages=[
        {"role": "user", "content": "Execute intent classification and synthesize response."}
    ],
    extra_body={
        "routing_strategy": "arbitrage-fastest"
    }
)

print(response.choices[0].message.content)
```

---

### TypeScript / Node.js (OpenAI SDK)

```typescript
import OpenAI from 'openai';

// 1. Initialize with Meida Edge Endpoint:
const openai = new OpenAI({
  baseURL: 'https://api.meida.cloud/v1',
  apiKey: process.env.MEIDA_API_KEY || 'me_live_xxxxxxxxxxxxxxxx',
});

// 2. Execute with zero code changes:
async function main() {
  const completion = await openai.chat.completions.create({
    model: 'auto-route',
    messages: [
      { role: 'user', content: 'Audit ERC-20 permit signature verification implementation.' }
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();
```

---

## Benchmarks & Performance

| Feature | Standard Direct Provider | Legacy AI Gateway | Meida Agent Router |
| :--- | :---: | :---: | :---: |
| **Failover Switch Latency** | Manual Intervention | 1.5s - 3.2s | **< 12ms Automated** |
| **Routing Engine Overhead** | N/A | > 250ms | **< 50ms Edge Engine** |
| **100% OpenAI Drop-In** | Vendor-Locked | Partial | **100% Spec Compatible** |
| **Token Cost Savings** | 0% | ~15% | **Up to ~65% Arbitrage** |
| **Developer Docs Portal** | Generic | Basic | **Interactive Live Simulator** |

---

## Security & Privacy

* **Zero Data Retention (ZDR):** Prompts and completions are processed entirely in ephemeral edge memory and never stored to disk or used for training.
* **TLS 1.3 Strict Enforcement:** End-to-end encrypted transport with cryptographic key validation.
* **Rate Limit Resilience:** Built-in token bucket rate limiters protecting against cascading API quotas.

---

## Local Development (Web UI & Docs Portal)

This repository contains the open-source frontend landing portal and developer documentation interface built with Next.js 15 and Tailwind CSS.

```bash
# 1. Clone the repository
git clone https://github.com/MeidaAgent/MeidaAgent.git
cd MeidaAgent

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive application.

---

## Repository Structure

```
├── app/
│   ├── (main)/              # Main landing page layout & entry
│   ├── docs/                # Complete developer documentation portal
│   │   ├── architecture/    # Engine architecture & packet lifecycle
│   │   ├── authentication/  # API keys & security credentials
│   │   ├── chat-completions/# OpenAI-compatible endpoints reference
│   │   ├── error-codes/     # Standardized HTTP error dictionary
│   │   ├── rate-limits/     # Tier limits & throughput quotas
│   │   └── routing-strategies/ # Routing algorithms & failover matrix
│   ├── globals.css          # Design system & dark glassmorphic utilities
│   └── layout.js            # SEO Metadata & OpenGraph configuration
├── components/              # 20+ Modular React & UI components
│   ├── ChatDrawer.jsx       # Interactive agent chat console
│   ├── PilotRouter.jsx      # Live routing simulator & circuit breaker
│   ├── TokenStats.jsx       # Real-time token telemetry & stats
│   └── ...
└── public/                  # Brand assets & visual media
```

---

## License & Community

* **Frontend & SDKs:** Licensed under the [MIT License](LICENSE).
* **Core Engine:** Proprietary enterprise routing algorithms maintained by the Meida Protocol Core Contributors.

<div align="center">
  <br />
  <p><strong>Connect with Meida</strong></p>
  <a href="https://meida.cloud">Website</a> •
  <a href="https://meida.cloud/docs">Documentation</a> •
  <a href="https://x.com/MeidaAgent">X / Twitter</a> •
  <a href="https://github.com/MeidaAgent/MeidaAgent">GitHub</a>
  <br /><br />
  <sub>Built for the decentralized, agentic internet. © 2026 Meida Protocol. All rights reserved.</sub>
</div>
