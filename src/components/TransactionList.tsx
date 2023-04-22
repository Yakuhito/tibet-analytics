import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Table } from 'react-bootstrap';
import { Transaction } from '@/api';
import Link from 'next/link';
import { formatToken, mojoToXCHString } from '@/utils';

interface TransactionListProps {
  transactions: Transaction[];
  tokenShortName: string;
  moarTxesAvailable: boolean;
  loadingMoarTxes: boolean;
  loadMoreTxes: () => void;
}

// hail GPT-4
function transformOperation(operation: string): string {
  return operation
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}

function stateChangeToString(state_change: any, token: string) {
  return <div>
    {mojoToXCHString(state_change["xch"], true)} <br/>
    {formatToken(state_change["token"], true)} {token}<br/>
    {state_change["liquidity"] === 0 ? '' : (
      formatToken(state_change["liquidity"], true) + " liquidity"
    )}
  </div>;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, tokenShortName, moarTxesAvailable, loadingMoarTxes, loadMoreTxes }) => {
  const generate_tbody = () => transactions.map(transaction => <tr className="align-middle text-left" key={transaction.coin_id}>
    <td><Link href={process.env.NEXT_PUBLIC_SPACESCAN_BASE_URL + transaction.coin_id} passHref>{transaction.coin_id}</Link></td>
    <td>{transformOperation(transaction.operation)}</td>
    <td>{stateChangeToString(transaction.state_change, tokenShortName)}</td>
    <td>{transaction.height}</td>
  </tr>);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Latest Transactions</Card.Title>
        <Card.Text className="fs-6">
          Deltas are from the AMM{"'"}s perspective. A negative value means that the trader received the assets, while a negative one means that the trader offered (paid) that asset.
        </Card.Text>
        <Table responsive>
          <thead className="bg-light text-left">
            <tr>
              <th>Coin ID</th>
              <th>Operation</th>
              <th>Changes (Deltas)</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {generate_tbody()}
            { moarTxesAvailable ? <tr className="text-center">
              <td colSpan={4}>
                <Button
                  size="sm"
                  className="my-2"
                  variant="outline-primary"
                  onClick={loadMoreTxes}
                  disabled={loadingMoarTxes}
                >
                  {loadingMoarTxes ? 'Loading...' : 'Load More'}
                </Button>
              </td>
            </tr> : <></>}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
