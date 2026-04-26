import type { CollectionConfig } from 'payload'

export const SpendingCategories: CollectionConfig = {
    slug: 'spendingCategories',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'color',
            type: 'text',
            required: true,
            admin: {
                description: 'CSS color (e.g. var(--coral) or #ff0000)',
            },
        },
    ],
}
