// pages/pair/[pair_id].tsx
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';

export default function Pair() {
  const router = useRouter();
  const { pair_id } = router.query;

  return (
    <Container>
      <h1>Pair Details</h1>
      <p>Pair ID: {pair_id}</p>
    </Container>
  );
}
