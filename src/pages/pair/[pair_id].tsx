// pages/pair/[pair_id].tsx
import { Pair, Transaction, getPair, getTransactions } from '@/api';
import { CustomCard } from '@/components/CustomCard';
import { TransactionList } from '@/components/TransactionList';
import { formatToken, mojoToXCHString } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PairDetails() {
  const router = useRouter();
  var { pair_id } = router.query;

  const PAGINATION = 42;

  const [pair, setPair] = useState<Pair | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMoarTxes, setLoadingMoreTxes] = useState(false);
  const [moarTxesAvailable, setMoarTxesAvailable] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pairData, transactionsData] = await Promise.all([getPair(pair_id as string), getTransactions(pair_id as string, PAGINATION)]);
        setPair(pairData);
        setTransactions(transactionsData);
        setMoarTxesAvailable(transactionsData.length === PAGINATION);
        setLoading(false);
      } catch (error) {
        alert('Error fetching data :(');
      }
    }

    fetchData();
  }, [pair_id]);

  const loadMoreTxes = async () => {
    if(loadingMoarTxes || !moarTxesAvailable) return;

    setLoadingMoreTxes(true);

    const newTxes = await getTransactions(pair_id as string, PAGINATION, transactions?.length ?? 0);

    setMoarTxesAvailable(newTxes.length === PAGINATION);
    setTransactions([
      ...(transactions ?? []),
      ...newTxes
    ]);
    setLoadingMoreTxes(false);
  };

  if (loading || pair === null) {
    return <div className='text-center mt-4'>Loading...</div>;
  }

  return (
    <p>pair id</p>
    // <div>
    //   <Row>
    //     <CustomCard title={`${process.env.NEXT_PUBLIC_XCH} Reserve`} value={mojoToXCHString(pair.xch_reserve)} subtitle="managed by pair" />
    //     <CustomCard title={`${pair.short_name} Reserve`} value={`${formatToken(pair.token_reserve)} ${pair.short_name}`} subtitle="managed by pair" />
    //     <CustomCard title="Liquidity" value={`${formatToken(pair.liquidity)}`} subtitle="liquidity tokens across all holders" />
    //   </Row>
    //   {transactions && (
    //     <TransactionList
    //       transactions={transactions}
    //       tokenShortName={pair.short_name}
    //       moarTxesAvailable={moarTxesAvailable}
    //       loadingMoarTxes={loadingMoarTxes}
    //       loadMoreTxes={loadMoreTxes}
    //     />
    //   )}
    // </div>
  );
}