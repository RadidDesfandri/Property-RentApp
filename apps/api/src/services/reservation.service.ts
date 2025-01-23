import { midTransLink } from '@/helper/fetchingMidtrans';

export const createPaymentLink = async (
  orderId: string,
  totalPrice: number,
  returnUrl: string,
) => {
  const data = {
    transaction_details: {
      order_id: `ORDERID-${orderId}`,
      gross_amount: totalPrice,
    },
    expiry: {
      unit: 'minutes',
      duration: 60,
    },
    callback: {
      finish: returnUrl,
    },
  };
  const midTransData = await midTransLink(data);
  return midTransData;
};
