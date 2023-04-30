import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function MyNavbar() {
  return (
    <nav className="w-full py-4 bg-white dark:bg-black flex justify-center items-center border-b border-neutral-300">
      <Link href={`${process.env.NEXT_PUBLIC_APP_URL}`}>
          <Image
              src="/logo.jpg"
              height="64"
              width="64"
              alt="TibetSwap Logo"
              className="rounded-full border border-neutral-300"
          />
      </Link>
    </nav>
  );
};