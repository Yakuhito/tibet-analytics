import React from 'react';
import Card from 'react-bootstrap/Card';
import { Pair } from '@/api';
import { Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { formatToken, mojoToXCHString } from '@/utils';


interface PairListProps {
  pairs: Pair[];
}

export const PairList: React.FC<PairListProps> = ({ pairs }) => {
  const generate_tbody = () => pairs.map(pair => <tr className="align-middle text-center" key={pair.launcher_id}>
    <td>
      <Image
        src={pair.image_url}
        alt="Token Image"
        height={24}
        width={24}
        className="circular-image-outline"
        roundedCircle
      />{' '}
      {pair.name}
    </td>
    <td>{mojoToXCHString(pair.xch_reserve)}</td>
    <td>{formatToken(pair.token_reserve)} {pair.short_name}</td>
    <td>{formatToken(pair.liquidity)} tokens</td>
    <td>{mojoToXCHString(pair.trade_volume)}</td>
    <td><Link href={`/pair/${pair.launcher_id}`} passHref>View Details</Link></td>
  </tr>);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Pairs</Card.Title>
        <Card.Text className="fs-6">
          All deployed TibetSwap pairs.    
        </Card.Text>
        <Table borderless responsive>
          <thead className="bg-light text-center">
            <tr>
              <th>Token</th>
              <th>XCH Reserve</th>
              <th>Token Reserve</th>
              <th>Liquidity</th>
              <th>Total Trade Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {generate_tbody()}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
