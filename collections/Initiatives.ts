import type { CollectionConfig } from 'payload';

export const Initiatives: CollectionConfig = {
    slug: 'initiatives',
    admin: { useAsTitle: 'title' },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'history', type: 'richText', label: 'Current Status & Challenges' },
        {
            name: 'projects',
            type: 'relationship',
            relationTo: 'projects',
            hasMany: true,
            label: 'Associated Projects',
        },
    ],
};