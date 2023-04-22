// Import React and necessary components
import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// Define an interface for the component props
interface CustomCardProps {
  title: string;
  value: string;
  subtitle: string;
}

// Create a functional component with TypeScript
export const CustomCard: React.FC<CustomCardProps> = ({ title, value, subtitle }) => {
  return (
    <Col md={4} lg={4} className="mb-4 mb-lg-4">
      <Card>
        <Card.Body className="text-center">
          <Card.Text className="text-uppercase fs-5 fw-light">{title}</Card.Text>
          <Card.Text className="text-dark mb-1 d-block h1">{value}</Card.Text>
          <Card.Text className="text-lowercase fs-6 fw-light">{subtitle}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
