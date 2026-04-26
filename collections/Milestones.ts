import type { CollectionConfig } from 'payload';

export const Milestones: CollectionConfig = {
    slug: 'milestones',
    admin: { useAsTitle: 'title' },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'richText' },
        { name: 'media', type: 'upload', relationTo: 'media' },
        { name: 'dateCompleted', type: 'date', defaultValue: () => new Date().toISOString() },
    ],
};