# Techmen WhatsApp AI Sales Agent

An AI-powered customer support and sales agent for **Techmen**, a laptop retailer based in Lahore, built with **n8n** and integrated with WhatsApp via the Meta Cloud API.

## Overview

The agent handles end-to-end customer interaction on WhatsApp — from greeting and product discovery to order placement — while automatically escalating bulk/business inquiries to the sales team via Slack.

[![workflow screenshot](screenshots/Laptop-Selling-Assistant.png)](screenshots/Laptop-Selling-Assistant.png)

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




# Appointment Booking Bot 🩺📅

An AI-powered WhatsApp assistant that handles end-to-end appointment booking for **Medical Clinic** — built with **n8n**, **WhatsApp Cloud API**, **Google Calendar**, and **Google Sheets**.

## Overview

Patients message the clinic on WhatsApp and are guided through a natural conversation by an AI agent that:
- Greets them and confirms booking intent
- Collects **email, name, appointment date, and appointment time**
- Reads the clinic's Google Calendar to show real-time available days and time slots
- Confirms details before finalizing
- Books the appointment directly into Google Calendar
- Logs and updates patient records in Google Sheets

No manual back-and-forth with staff — the entire flow, from greeting to confirmed booking, is automated.



[![workflow screenshot](screenshots/Appointment-Booking-Bot.png)](screenshots/Appointment-Booking-Bot.png)



## Tech Stack

- **n8n** — workflow orchestration & AI Agent
- **WhatsApp Cloud API (Meta)** — messaging channel
- **Google Calendar API** — read/write appointment slots
- **Google Sheets API** — patient records (add/append rows, matched by email)
- **LLM (via n8n AI Agent node)** — conversation handling & structured data extraction using `$fromAI()`

## How It Works

1. **WhatsApp Trigger** receives an incoming patient message.
2. **AI Agent** manages the conversation — greeting, intent check, and data collection.
3. **Calendar Read** tool fetches existing bookings to determine free slots (max 8/day, 30-min slots, 6 PM–10 PM).
4. Agent presents available **days**, then **time slots**, to the patient.
5. Once confirmed, the agent calls:
   - **Calendar Create** — books the event on Google Calendar
   - **Google Sheets (Add/Append Row)** — saves/updates the patient's record, matched by email
6. Patient receives a confirmation message on WhatsApp.

## Clinic Rules (configurable)

| Setting | Value |
|---|---|
| Operating hours | 6:00 PM – 10:00 PM |
| Slot duration | 30 minutes |
| Max patients/day | 8 |

## Key Design Decisions

- Data is saved **incrementally** (e.g. email is saved the moment it's received) rather than all at once at the end, to avoid losing partial info if a conversation drops off.
- The agent always re-checks **Calendar Read** right before booking to prevent double-booking.
- Structured fields (email, name, date, time, status) are extracted via n8n's `$fromAI()` mapping in each tool node, ensuring clean, consistent data lands in Sheets/Calendar.


## Author

**Areeba Aijaz** — Automation Engineer (n8n, AI Agents, Workflow Automation)
