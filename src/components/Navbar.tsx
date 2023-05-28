import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="sticky w-full top-0 bg-brandLight/50 dark:bg-zinc-900/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex gap-8 items-center justify-between py-4">
        <Link href="/">
            <Image
              src="/logo.jpg"
              height="64"
              width="64"
              alt="TibetSwap Logo"
              className="rounded-full border-neutral-300 hover:translate-y-1 hover:opacity-80 transition dark:opacity-80"
            />
        </Link>
        <div className="flex items-center rounded-xl p-1">
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}`} className="hover:opacity-80 font-medium text-brandDark/70 dark:text-brandLight/50 px-6 py-1.5 rounded-xl">Swap</Link>
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/faq`} className="hover:opacity-80 font-medium text-brandDark/70 dark:text-brandLight/50 px-6 py-1.5 rounded-xl">FAQs</Link>
          <Link href="/" className="font-medium text-brandDark dark:text-brandLight px-6 py-1.5 bg-brandDark/10 rounded-xl">Stats</Link>
        </div>
      </div>
    </nav>
  );
};