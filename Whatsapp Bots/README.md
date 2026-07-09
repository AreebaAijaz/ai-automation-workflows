# Techmen WhatsApp AI Sales Agent

An AI-powered customer support and sales agent for **Techmen**, a laptop retailer based in Lahore, built with **n8n** and integrated with WhatsApp via the Meta Cloud API.

## Overview

The agent handles end-to-end customer interaction on WhatsApp — from greeting and product discovery to order placement — while automatically escalating bulk/business inquiries to the sales team via Slack.

## Features

- **Conversational product discovery** — recommends laptops based on either explicit technical requirements or use-case + budget (for non-technical buyers)
- **Live inventory lookup** — checks real-time stock and pricing from a Google Sheet before every recommendation or quote
- **Intent classification** — distinguishes single/individual buyers from bulk/business buyers
- **Bulk order handoff** — automatically escalates business/bulk inquiries to the sales team via Slack instead of processing them as standard sales
- **In-chat order placement** — collects customer details, confirms the order, and logs it to a Google Sheet
- **Dual purchase paths** — customers can order via the website or directly through WhatsApp

## Tech Stack

| Component | Tool |
|---|---|
| Workflow orchestration | n8n |
| Messaging channel | WhatsApp (Meta Cloud API) |
| AI agent | LLM-based conversational agent |
| Inventory | Google Sheets |
| Order storage | Google Sheets |
| Team escalation | Slack |
| Order Confirmation Notification | Gmail |



## Architecture

```
WhatsApp (Meta Cloud API)
        │
        ▼
   n8n Trigger
        │
        ▼
   AI Agent (system prompt–driven)
   ├── read_sheet   → check laptop inventory
   ├── notify_slack → escalate bulk orders
   └── write_order  → save confirmed orders
        │
        ▼
   Response back to WhatsApp
```

## Conversation Flow

1. Greet the customer
2. Share company info if asked (hours, location, website, delivery)
3. Classify buyer intent — single purchase vs. bulk → escalate bulk to Slack
4. Assess technical knowledge and recommend a laptop (inventory-checked)
5. Offer order options — website or in-chat
6. Collect customer details and confirm the order
7. Save the order to Google Sheets and confirm with the customer via Whatsapp then send an email via Gmail node



## Author

Areeba Aijaz — Automation Engineer (n8n, AI agents, workflow automation)
