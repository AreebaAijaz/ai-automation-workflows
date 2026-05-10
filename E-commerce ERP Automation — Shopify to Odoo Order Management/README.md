# Shopify → Odoo Automation

An end-to-end automation workflow that syncs Shopify orders into Odoo in real time — handling contact management, sales orders, invoicing, delivery confirmation, and customer email notifications automatically.

---

## Overview

When a customer places an order on Shopify, this workflow kicks in instantly and handles everything on the Odoo side without any manual intervention — from creating the customer contact all the way to sending the invoice PDF to their inbox.

---

## Features

- Real-time order sync via Shopify webhook
- Automatic customer contact creation with deduplication by email
- Sales order creation and confirmation
- Invoice generation and posting
- Delivery order confirmation
- Automated invoice email delivery to the customer

---

## Tech Stack

| Tool | Role |
|------|------|
| **n8n** | Workflow automation engine |
| **Shopify** | E-commerce platform (webhook trigger) |
| **Odoo (SaaS)** | ERP — contacts, sales, invoicing, delivery |
| **Gmail SMTP** | Outgoing email for invoice delivery |

---

## Workflow

```
Shopify Order Placed
    └── Extract & Normalize Order Data
        └── Find Customer in Odoo (by email)
            └── Customer Exists?
                ├── Yes → Use Existing Contact
                └── No  → Create New Contact
                    └── Create Sales Order
                        └── Confirm Sales Order
                            └── Create Invoice
                                └── Post Invoice
                                    └── Confirm Delivery
                                        └── Send Invoice to Customer
```

---

## Setup

### Prerequisites
- n8n instance (cloud or self-hosted)
- Odoo SaaS account
- Shopify store with API access
- Gmail account with App Password enabled

### Odoo Configuration
- Configure an Outgoing Mail Server (Gmail SMTP, port 587, STARTTLS)
- Set up Document Layout under Settings → Companies
- Update `mail.default.from` in System Parameters to match your sender email

### n8n Credentials
- **Odoo:** JSON-RPC credential (database URL, email, API key)
- **Shopify:** API credential + webhook (event: `orders/create`)

---

