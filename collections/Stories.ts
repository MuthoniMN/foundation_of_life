import type { CollectionConfig } from 'payload'

export const Stories: CollectionConfig = {
    slug: 'stories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'age',
            type: 'number',
            required: true,
        },
        {
            name: 'quote',
            type: 'textarea',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ],
}
