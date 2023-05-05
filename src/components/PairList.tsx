import { formatToken, mojoToXCHString } from '@/utils';
import Image from 'next/image';
import { Pair } from '@/api';
import Link from 'next/link';
import React from 'react';

interface PairListProps {
  pairs: Pair[];
}

export const PairList: React.FC<PairListProps> = ({ pairs }) => {
  const generate_tbody = () => pairs.map(pair => (
    <Link key={pair.launcher_id} href={`/pair/${pair.launcher_id}`} className="contents">
      <tr className="hover:opacity-60 align-middle dark:text-brandLight">
        <td className="flex items-center gap-3 h-16 pl-4">
          <Image
            src={pair.image_url}
            alt="Token Image"
            height={24}
            width={24}
            className="rounded-full"
          />
          <p className="max-w-[22rem] inline-flex gap-2">
            <span className="hidden sm:block text-ellipsis overflow-hidden">{pair.name}</span>
            <span className="sm:text-brandDark/50 dark:sm:text-brandLight/50 sm:before:content-['('] sm:after:content-[')']">{pair.short_name}</span>
          </p>
        </td>
        <td className="pr-4 text-right hidden xl:table-cell">{mojoToXCHString(pair.xch_reserve)}</td>
        <td className="pr-4 text-right hidden xl:table-cell">{formatToken(pair.token_reserve)} {pair.short_name}</td>
        <td className="pr-4 text-right hidden md:table-cell">{formatToken(pair.liquidity)} tokens</td>
        <td className="pr-4 text-right">{mojoToXCHString(pair.trade_volume)}</td>
      </tr>
    </Link>
    
  )
  );

  return (
    <table className="w-full font-medium whitespace-nowrap animate-fadeIn">
      <thead className="text-left text-brandDark/90 sticky top-24 bg-brandLight/80 dark:bg-zinc-900/80">
        <tr className="h-16 sm:text-xl backdrop-blur dark:text-brandLight/80">
          <th><span className="bg-brandDark/10 px-4 rounded-full py-1">Token</span></th>
          <th className="text-right hidden xl:table-cell"><span className='bg-brandDark/10 px-4 rounded-full py-1'>XCH Reserve</span></th>
          <th className="text-right hidden xl:table-cell"><span className='bg-brandDark/10 px-4 rounded-full py-1'>Token Reserve</span></th>
          <th className="text-right hidden md:table-cell"><span className='bg-brandDark/10 px-4 rounded-full py-1'>Liquidity</span></th>
          <th className="text-right"><span className='bg-brandDark/10 px-4 rounded-full py-1'>Trade Volume</span></th>
        </tr>
      </thead>
      <tbody>
        {generate_tbody()}
      </tbody>
    </table>
  );
};