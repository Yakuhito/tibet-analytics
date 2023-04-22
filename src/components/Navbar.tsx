import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';

export default function MyNavbar() {
  return (
    <Navbar bg="white" variant="pills" className="border-bottom mb-2 justify-content-center">
        <Navbar.Brand className="ml-4 text-center">
            <Link href="https://v1-testnet10.tibetswap.io" passHref>
                <Image
                    src="/logo.jpg"
                    height="64"
                    width="64"
                    alt="TibetSwap Logo"
                    className="circular-image-outline"
                    roundedCircle
                />
            </Link>
        </Navbar.Brand>
    </Navbar>
  );
}