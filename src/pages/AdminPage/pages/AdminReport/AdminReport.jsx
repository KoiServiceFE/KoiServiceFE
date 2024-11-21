/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement
);
import { fetchServiceRevenue } from "../../../../services/serviceService";

export default function AdminReport() {
  const [revenueData2, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const endDate = new Date(today.setDate(today.getDate() + 2)).toISOString().split("T")[0]; 
  const startDate = new Date(today.setDate(today.getDate() - 32)).toISOString().split("T")[0]; // 30 days ago from the new endDate

  useEffect(() => {
    fetchServiceRevenue(startDate, endDate)
      .then((data) => {
        setRevenueData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching revenue:", error);
        setLoading(false);
      });
  }, []);

  // Data for the Bar Chart
  const barChartData = {
    labels: revenueData2.map((item) => item.serviceName),
    datasets: [
      {
        label: "Total Revenue (in $)",
        data: revenueData2.map((item) => item.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the Bar Chart
  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (VND)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Services",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const serviceName = tooltipItem.label; // Get the service name
            const revenueValue = tooltipItem.raw; // Get the revenue value
            return `${serviceName}: $${revenueValue.toLocaleString()}`; // Format tooltip
          },
        },
      },
    },
  };
  const totalRevenue = revenueData2
    .reduce((sum, item) => sum + item.totalRevenue, 0)
    .toLocaleString();

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Revenue</Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  {revenueData2.length > 0 ? (
                    <Card.Text>Total revenue: {totalRevenue} VND</Card.Text>
                  ) : (
                    <Card.Text>No revenue data available.</Card.Text>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Service Revenue Breakdown</Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Bar data={barChartData} options={barChartOptions} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
