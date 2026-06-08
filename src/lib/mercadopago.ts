import { MercadoPagoConfig } from 'mercadopago';

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

if (!accessToken) {
  console.warn('MERCADOPAGO_ACCESS_TOKEN not set - payments will not work');
}

export const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: accessToken || '',
});
