import Head from 'next/head';
import React from 'react';

interface ServiceLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function ServiceLayout({ title, description, children }: ServiceLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} - Mind Project</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </>
  );
}
