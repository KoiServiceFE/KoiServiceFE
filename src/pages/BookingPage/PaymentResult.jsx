import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { paymentInfo } from '../../stores/slices/paymentSlice';

const PaymentResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);

  const formatDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6) - 1;
    const day = dateString.slice(6, 8);
    const hours = dateString.slice(8, 10);
    const minutes = dateString.slice(10, 12);
    const seconds = dateString.slice(12, 14);
    return new Date(year, month, day, hours, minutes, seconds);
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const paymentData = {
    vnp_Amount: (queryParams.get('vnp_Amount') / 100),  // chia 100 để khớp dữ liệu
    vnp_BankCode: queryParams.get('vnp_BankCode'),
    vnp_BankTranNo: queryParams.get('vnp_BankTranNo'),
    vnp_CardType: queryParams.get('vnp_CardType'),
    vnp_OrderInfo: queryParams.get('vnp_OrderInfo'),
    vnp_PayDate: formatDate(queryParams.get('vnp_PayDate')),
    vnp_ResponseCode: queryParams.get('vnp_ResponseCode'),
    vnp_TransactionNo: queryParams.get('vnp_TransactionNo'),
    vnp_TransactionStatus: queryParams.get('vnp_TransactionStatus'),
    vnp_TxnRef: queryParams.get('vnp_TxnRef'),
  };

  useEffect(() => {
    const paymentDataWithDateString = {
      ...paymentData,
      vnp_PayDate: paymentData.vnp_PayDate.toISOString(),
    };
    dispatch(paymentInfo(paymentDataWithDateString));
  }, [dispatch]);


  return (
    <Container className="py-5">
      <Card>
        <Card.Header className="bg-success text-white">
          <h2 style={{ color: "black", fontWeight: "600" }}>Payment Information</h2>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td><strong>Amount</strong></td>
                <td>{formatAmount(paymentData.vnp_Amount)} VND</td>
              </tr>
              <tr>
                <td><strong>BankCode</strong></td>
                <td>{paymentData.vnp_BankCode}</td>
              </tr>
              <tr>
                <td><strong>BankTranNo</strong></td>
                <td>{paymentData.vnp_BankTranNo}</td>
              </tr>
              <tr>
                <td><strong>CardType</strong></td>
                <td>{paymentData.vnp_CardType}</td>
              </tr>
              <tr>
                <td><strong>OrderInfo</strong></td>
                <td>{paymentData.vnp_OrderInfo}</td>
              </tr>
              <tr>
                <td><strong>PayDate</strong></td>
                <td>{paymentData.vnp_PayDate.toLocaleString('vi-VN')}</td>
              </tr>
              <tr>
                <td><strong>TransactionNo</strong></td>
                <td>{paymentData.vnp_TransactionNo}</td>
              </tr>
              <tr>
                <td><strong>TxnRef</strong></td>
                <td>{paymentData.vnp_TxnRef}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={() => window.location.href = '/'}>Back Home</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default PaymentResult;
