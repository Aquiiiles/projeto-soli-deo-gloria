import { NextRequest, NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import { mercadoPagoClient } from '@/lib/mercadopago';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Mercado Pago sends different types of notifications
    if (
      body.type === 'payment' ||
      body.action === 'payment.updated' ||
      body.action === 'payment.created'
    ) {
      const paymentId = body.data?.id;

      if (paymentId) {
        const payment = new Payment(mercadoPagoClient);
        const paymentInfo = await payment.get({ id: paymentId });

        // Log payment status update
        console.log(`Payment ${paymentId} status: ${paymentInfo.status}`, {
          event_id: paymentInfo.metadata?.event_id,
          registration_name: paymentInfo.metadata?.registration_name,
          amount: paymentInfo.transaction_amount,
        });

        // TODO: When database is connected, update registration status here
        // if (paymentInfo.status === 'approved') { ... update registration to confirmed }
        // if (paymentInfo.status === 'cancelled' || paymentInfo.status === 'rejected') { ... update to cancelled }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Always return 200 to Mercado Pago so they don't retry
    return NextResponse.json({ received: true });
  }
}
