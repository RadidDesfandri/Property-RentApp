import axios from 'axios';
interface TransactionDetails {
  order_id: string;
  gross_amount: number;
}

interface Expiry {
  unit: string;
  duration: number;
}

interface Data {
  transaction_details: TransactionDetails;
  expiry: Expiry;
  return_url?: string;
}

export const midTransLink = async (data: Data) => {
  const midTrans = await axios.post(
    'https://app.sandbox.midtrans.com/snap/v1/transactions',
    data,
    {
      headers: {
        Authorization: `Basic ${process.env.MIDTRANS_SERVER_KEY}`,
      },
    },
  );
  return midTrans.data;
};

