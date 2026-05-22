type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "How do I earn commissions?",
    answer:
      "Commissions are calculated automatically upon successful delivery and payment of an order placed through your unique agent referral link or submitted via your agent dashboard.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Standard agent applications are typically reviewed and approved within 24-48 business hours. Enterprise partner applications may require additional verification.",
  },
  {
    question: "Can I represent multiple stores?",
    answer:
      "Yes, as a verified agent, you have access to distribute products from any store within the Rokswood Marketplace network unless restricted by specific exclusivity agreements.",
  },
  {
    question: "Is there training provided?",
    answer:
      "Absolutely. All approved agents receive access to our digital knowledge base, product training webinars, and marketing asset library.",
  },
];

export default function AgentFaq() {
  return (
    <section className="bg-[var(--bg-base)] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-sm"
            >
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
