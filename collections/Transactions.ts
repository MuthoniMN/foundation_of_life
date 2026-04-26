import type { CollectionConfig } from 'payload';

export const Transactions: CollectionConfig = {
    slug: 'transactions',
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'amount', 'date', 'status'],
    },
    access: {
        read: ({ req: { user } }) => !!user, // Only logged-in admins can view transactions
        create: () => true, // Webhooks need to create entries
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
        },
        {
            name: 'currency',
            type: 'text',
            defaultValue: 'usd',
        },
        {
            name: 'stripeSessionId',
            type: 'text',
            required: true, // Crucial for preventing duplicate webhooks
            unique: true,
        },
        {
            name: 'date',
            type: 'date',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: "donationGoal",
            type: "relationship",
            relationTo: "donation-presets",
            hasMany: false,
            required: false,
            admin: {
                description: 'Which goal was this donation for?',
            },
        },
        {
            name: "project",
            type: "relationship",
            relationTo: "projects",
            hasMany: false,
            required: false,
            admin: {
                description: "Which project this donation was made for.",
            },
        },
        {
            name: "projectSlug",
            type: "text",
            required: false,
            admin: {
                description: "Project slug captured from checkout query/reference.",
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'succeeded',
            options: [
                { label: 'Succeeded', value: 'succeeded' },
                { label: 'Pending', value: 'pending' },
                { label: 'Failed', value: 'failed' },
            ],
        },
    ],
};