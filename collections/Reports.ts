import type { CollectionConfig } from 'payload'
import { ReportCategory } from '@/blocks/ReportCategory/config'

export const Reports: CollectionConfig = {
    slug: 'reports',
    admin: {
        useAsTitle: 'period',
        defaultColumns: ['period', 'totalReceived', 'totalSpent'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'period',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'e.g. Q3 2024 (Jul – Sep)',
            },
        },
        {
            name: 'description',
            type: 'richText',
            required: true,
            admin: {
                description: 'How was the money utilized during this time period?',
            },
        },
        {
            name: 'totalReceived',
            type: 'number',
            required: true,
            admin: {
                description: 'Total amount received in USD',
            },
        },
        {
            name: 'totalSpent',
            type: 'number',
            required: true,
            admin: {
                description: 'Total amount spent in USD',
            },
        },
        {
            name: 'categories',
            type: 'blocks',
            required: true,
            blocks: [ReportCategory],
        },
        {
            name: 'transactions',
            type: 'relationship',
            label: 'Transactions',
            admin: {
                description: 'Select transactions',
            },
            relationTo: 'transactions',
            hasMany: true,
        },
        {
            name: 'notes',
            type: 'textarea',
            required: true,
        },
        {
            name: 'reportFile',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'milestones',
            type: 'relationship',
            label: 'Key Milestones Achieved',
            admin: {
                description: 'Select the specific milestones completed during this period.',
            },
            relationTo: 'milestones',
            hasMany: true,
        },
    ],
}
