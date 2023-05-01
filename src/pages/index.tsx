import { formatDollars, mojoToXCHString } from '@/utils';
import { getStats, getPairs, Stats, Pair } from '@/api';
import { CustomCard } from '@/components/CustomCard';
import React, { useEffect, useState } from 'react';
import { PairList } from '@/components/PairList';


async function getXCHPrice(): Promise<number | null> {
  try {
    const resp = await fetch("https://xchscan.com/api/chia-price");
    const resp_parsed = await resp.json();
    return resp_parsed.usd;
  } catch(_) {
    return null;
  }
}

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, pairsData, priceData] = await Promise.all([getStats(), getPairs(), getXCHPrice()]);
        setStats(statsData);
        setPairs(pairsData);
        setPrice(priceData)
        setLoading(false);
      } catch (error) {
        alert('Error fetching data :(');
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className='text-center mt-4'>Loading...</div>;
  }

  const tvlString = mojoToXCHString(stats!.total_value_locked);
  const ttvString = mojoToXCHString(stats!.total_trade_volume);

  var tvlPrice = "Fetching price...";
  var ttvPrice = "Fetching price...";
  if(price !== null && stats !== null) {
    tvlPrice = formatDollars(stats.total_value_locked * price / (10 ** 12));
    ttvPrice = formatDollars(stats.total_trade_volume * price / (10 ** 12));
  }
  return (
    <main>

      {/* Analytics Section */}
      <section>
        <h1 className="font-bold text-5xl py-12">Analytics</h1>
        <div className="w-full px-4 py-8 md:py-12 rounded-xl flex flex-col lg:flex-row md:justify-evenly gap-8 bg-brandDark bg-gradient-to-br from-[#7fa9b8] to-brandDark">
          <CustomCard title="Transactions" value={stats!.transaction_count.toLocaleString('en-US')} />
          <CustomCard title="Total Value Locked" value={tvlString} subtitle={tvlPrice} />
          <CustomCard title="Total Trade Volume" value={ttvString} subtitle={ttvPrice} />
        </div>
      </section>


      {/* Pairs Table Section */}
      <section>
        <h3 className="font-bold text-5xl py-8 pt-16">Pairs</h3>

        {pairs && (
          <div className="px-4 pb-20">
            <PairList pairs={pairs}/>
          </div>
        )}
      </section>
    </main>
  );
};

export default StatsPage;
