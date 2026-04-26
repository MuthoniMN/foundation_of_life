import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: { useAsTitle: 'title' },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'goalDescription', type: 'textarea' },
        { name: "estimatedBudget", type: "number" },
        {
            name: 'milestones',
            type: 'relationship',
            relationTo: 'milestones',
            hasMany: true,
        },
    ],
};