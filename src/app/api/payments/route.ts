import { NextRequest, NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import { mercadoPagoClient } from '@/lib/mercadopago';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, eventName, amount, payer, eventId, registrationData } = body;

    // Validate required fields
    if (!method || !amount || !payer?.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const payment = new Payment(mercadoPagoClient);

    let paymentData: any = {
      transaction_amount: Number(amount),
      description: `Inscrição - ${eventName}`,
      payer: {
        email: payer.email,
        first_name: payer.name?.split(' ')[0] || '',
        last_name: payer.name?.split(' ').slice(1).join(' ') || '',
      },
      metadata: {
        event_id: eventId,
        registration_name: registrationData?.name,
        registration_email: registrationData?.email,
        registration_phone: registrationData?.phone,
        registration_church: registrationData?.church,
      },
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://projetosolideogloria.com'}/api/payments/webhook`,
    };

    if (method === 'pix') {
      paymentData.payment_method_id = 'pix';
    } else if (method === 'boleto') {
      paymentData.payment_method_id = 'bolbradesco';
    } else if (method === 'credit_card') {
      // For credit card, we need the token from the frontend SDK
      if (!body.token) {
        return NextResponse.json(
          { error: 'Card token is required' },
          { status: 400 }
        );
      }
      paymentData.token = body.token;
      paymentData.installments = body.installments || 1;
      paymentData.payment_method_id = body.payment_method_id;
      if (body.issuer_id) {
        paymentData.issuer_id = body.issuer_id;
      }
    }

    const result = await payment.create({ body: paymentData });

    // Build response based on payment method
    const response: any = {
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    };

    if (method === 'pix') {
      // PIX returns QR code data
      const pixData = result.point_of_interaction?.transaction_data;
      response.pix = {
        qr_code: pixData?.qr_code,
        qr_code_base64: pixData?.qr_code_base64,
        ticket_url: pixData?.ticket_url,
      };
    } else if (method === 'boleto') {
      response.boleto = {
        barcode: (result as any).barcode?.content,
        external_resource_url:
          result.transaction_details?.external_resource_url,
      };
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Payment error:', error);
    const message =
      error?.message ||
      error?.cause?.[0]?.description ||
      'Payment processing failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
