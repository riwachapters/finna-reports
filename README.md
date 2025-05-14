# 📊 Finna Reports

## What is it?  
**Finna Reports** is a modular, web-based financial reporting dashboard built with **Next.js**, **ShadCN UI**, **Tailwind CSS**, and **TanStack Table**. It provides interactive and standardized financial statements for public institutions like hospitals and government agencies.

---

## 🧩 The Problem  
Government-affiliated institutions often rely on manual, spreadsheet-based workflows to produce financial reports such as:

- Statement of Financial Assets and Liabilities  
- Cash Flow Statement  
- Statement of Changes in Net Assets  
- Budget vs. Actual Report  

These workflows result in:

- ❌ Inconsistency in formatting and reporting standards  
- ❌ Limited accessibility for real-time or web-based viewing  
- ❌ High error rates due to manual aggregation and calculations  

---

## 💡 The Solution  
**Finna Reports** addresses these challenges by transforming raw financial data (e.g., Markdown or structured files) into **interactive, web-based financial statements**. It enables:

- ✅ **Reusable components** for rendering professional, readable reports  
- ✅ **Dynamic tables** using TanStack Table for sorting, formatting, and totals  
- ✅ **Validation and transformation** of data using Zod and utility functions  
- ✅ **State management** via Zustand for a responsive, client-first experience  
- ✅ **Consistency and scalability** for financial data across institutions  

---

> Built with transparency and usability in mind, Finna Reports helps institutions modernize their financial reporting while ensuring accuracy and accessibility.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

2. assets & liabilities
3. cash flows
4. changes in net assets
5. budget vs actual

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
