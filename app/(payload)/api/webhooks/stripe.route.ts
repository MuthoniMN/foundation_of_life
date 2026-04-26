import { headers } from 'next/headers';
import { getPayload } from 'payload';
import config from '@/payload.config';
import stripe from '@/lib/stripe'; // Initialize stripe-node here

export async function POST(req: Request) {
    const body = await req.text();
    const sig = (await headers()).get('stripe-signature')!;
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const payload = await getPayload({ config });
        const clientReference = session.client_reference_id || '';

        let projectId: number | undefined;
        let projectSlug: string | undefined;
        const projectMatch = String(clientReference).match(/project:(\d+):([a-z0-9-]+)/i);
        if (projectMatch) {
            projectId = Number(projectMatch[1]);
            projectSlug = projectMatch[2];
        }

        const amount = typeof session.amount_total === 'number' ? session.amount_total / 100 : 0;
        const currency = typeof session.currency === 'string' ? session.currency : 'usd';
        const email = session.customer_details?.email || session.customer_email || 'unknown@example.com';
        const sessionId = session.id;

        const existing = await payload.find({
            collection: 'transactions',
            where: {
                stripeSessionId: {
                    equals: sessionId,
                },
            },
            limit: 1,
        });
        if (existing.totalDocs > 0) {
            return new Response(null, { status: 200 });
        }

        // 1. Save to Payload Transactions collection
        await payload.create({
            collection: 'transactions',
            data: {
                email,
                amount,
                currency,
                stripeSessionId: sessionId,
                date: new Date().toISOString(),
                status: 'succeeded',
                ...(projectId ? { project: projectId } : {}),
                ...(projectSlug ? { projectSlug } : {}),
            },
        });

        // 2. Send Thank You Email
        if (email && email !== 'unknown@example.com') {
            await payload.sendEmail({
                from: 'ndianguimichelle@gmail.com',
                to: email,
                subject: 'Thank you for your support!',
                html: '<p>Your gift makes a difference. Thank you for supporting Chariots of Destiny.</p>',
            });
        }
    }

    return new Response(null, { status: 200 });
}