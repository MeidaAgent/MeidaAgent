import './globals.css';

export const metadata = {
  metadataBase: new URL('https://meida.cloud'),
  title: 'Meida Agent — High-Performance AI Router & Web3 Gateway',
  description:
    'High-performance, sub-50ms intelligent LLM router with zero-downtime failover and 100% drop-in OpenAI SDK compatibility for crypto and Web3 applications.',
  keywords: [
    'Meida Agent',
    'AI Router',
    'LLM Gateway',
    'Sub-50ms Latency',
    'Zero-Downtime Failover',
    'OpenAI Drop-In',
    'Crypto AI',
    'Web3 Infrastructure',
    'Agent Orchestration',
  ],
  openGraph: {
    title: 'Meida Agent — High-Performance AI Router & Web3 Gateway',
    description:
      'High-performance, sub-50ms intelligent LLM router with zero-downtime failover and 100% drop-in OpenAI SDK compatibility for crypto and Web3 applications.',
    type: 'website',
    images: [
      {
        url: '/meida-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Meida Agent Banner',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meida Agent — High-Performance AI Router & Web3 Gateway',
    description:
      'High-performance, sub-50ms intelligent LLM router with zero-downtime failover and 100% drop-in OpenAI SDK compatibility for crypto and Web3 applications.',
    images: ['/meida-banner.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="virtual-protocol-site-verification" content="d9f90808c9c148c4fc5b422d241cc177" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
