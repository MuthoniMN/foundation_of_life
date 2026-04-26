import type { CollectionConfig } from 'payload'

export const DonationPresets: CollectionConfig = {
    slug: 'donation-presets',
    admin: {
        useAsTitle: 'label',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'amount',
            type: 'number',
            required: true,
        },
        {
            name: 'label',
            type: 'text',
            required: true,
        },
        {
            name: 'stripePaymentLink',
            label: 'Stripe Payment Link',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
            required: true,
        },
    ],
}
