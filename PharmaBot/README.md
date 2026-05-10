# PharmaBot — WhatsApp AI Automation (n8n + Meta Cloud API)

An intelligent WhatsApp automation system built for a B2B pharmaceutical distribution company in Pakistan. The bot handles customer queries automatically using AI, responds in Roman Urdu + English, and fetches real-time product data from a Google Sheets database.

---

## Features

- **AI Intent Classification** — automatically detects whether a customer is asking about pricing, availability, or a general query
- **Product Lookup** — fetches live data from Google Sheets (price, stock status, category)
- **Multilingual Replies** — responds naturally in Roman Urdu + English mix via OpenAI GPT-4o-mini
- **WhatsApp Cloud API Integration** — fully integrated with Meta's official WhatsApp Business API
- **Webhook Handling** — receives and processes incoming WhatsApp messages in real time via n8n

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| n8n (cloud) | Workflow automation engine |
| Meta WhatsApp Cloud API | WhatsApp messaging layer |
| OpenAI GPT-4o-mini | Intent classification + AI reply generation |
| Google Sheets | Mock product database |
| HTTP Request node | WhatsApp message sending via Graph API |

---

## Workflow Architecture

```
Incoming WhatsApp Message
        ↓
   n8n Webhook
        ↓
Extract Message Data (sender, message, name)
        ↓
AI Agent → Intent + Product Name Extraction
        ↓
   Intent Router (Switch)
   ↙        ↓        ↘
Pricing  Availability  General
   ↓          ↓
Google Sheets Lookup
   ↓          ↓        ↓
AI Reply Formatter (Roman Urdu + English)
        ↓
WhatsApp Reply (Meta Graph API)
```

---

