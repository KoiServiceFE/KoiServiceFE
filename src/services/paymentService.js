import axios from "../config/axios";

export const createPayment = async (serviceID) => {
    try {
        const response = await axios.get(`/payment/create?serviceID=${serviceID}`);
        return response.data;
    } catch (error) {
        throw new Error('Error creating payment: ' + error.message);
    }
};

export const fetchPaymentInfo = async (paymentData) => {
    try {
        const response = await axios.get("/payment/payment_infor", {
            params: {
                vnp_Amount: paymentData.vnp_Amount,
                vnp_BankCode: paymentData.vnp_BankCode,
                vnp_OrderInfo: paymentData.vnp_OrderInfo,
                vnp_ResponseCode: paymentData.vnp_ResponseCode,
                vnp_PayDate: paymentData.vnp_PayDate,
                vnp_TransactionNo:paymentData.vnp_TransactionNo,
                vnp_TxnRef: paymentData.vnp_TxnRef
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error checking payment status: ' + error.message);
    }
}; 


