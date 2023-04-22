import React, { useEffect, useState } from 'react';
import { getStats, getPairs, Stats, Pair } from '@/api';
import { Row } from 'react-bootstrap';
import { CustomCard } from '@/components/CustomCard';
import { PairList } from '@/components/PairList';
import { formatDollars, mojoToXCHString } from '@/utils';

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
    <div>
      <Row>
        <CustomCard title="Transactions" value={stats!.transaction_count.toLocaleString('en-US')} subtitle="Since Launch" />
        <CustomCard title="Total Value Locked" value={tvlString} subtitle={tvlPrice} />
        <CustomCard title="Total Trade Volume" value={ttvString} subtitle={ttvPrice} />
      </Row>
      {pairs && (
        <PairList pairs={pairs}/>
      )}
    </div>
  );
};

export default StatsPage;
