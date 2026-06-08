import { NextRequest, NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import { mercadoPagoClient } from '@/lib/mercadopago';

export async function GET(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID required' },
        { status: 400 }
      );
    }

    const payment = new Payment(mercadoPagoClient);
    const result = await payment.get({ id: Number(paymentId) });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      payment_method_id: result.payment_method_id,
      transaction_amount: result.transaction_amount,
    });
  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
