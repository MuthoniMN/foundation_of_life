import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
    slug: 'programs',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'icon',
            type: 'text',
            required: true,
            admin: {
                description: 'Emoji or icon name',
            },
        },
        {
            name: 'body',
            type: 'textarea',
            required: true,
        },
    ],
}
