import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
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
            name: 'tagline',
            type: 'text',
            required: true,
        },
        {
            name: 'shortDescription',
            type: 'textarea',
            required: true,
        },
        {
            name: 'founded',
            type: 'number',
            required: true,
        },
        {
            name: 'founder',
            type: 'text',
            required: true,
        },
        {
            name: 'numberOfChildrenSupported',
            type: 'number',
            required: true,
        },
        {
            name: 'contact',
            type: 'group',
            fields: [
                {
                    name: 'name',
                    label: "Contact Person",
                    type: 'text',
                    required: true,
                },
                {
                    name: 'email',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'postBox',
                    type: 'text',
                },
                {
                    name: "location",
                    type: "text",
                },
                {
                    name: 'phone',
                    type: 'array',
                    fields: [
                        {
                            name: 'phoneNumber',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'address',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
        {
            name: 'social',
            type: 'group',
            fields: [
                {
                    name: 'facebook',
                    type: 'text',
                },
                {
                    name: 'instagram',
                    type: 'text',
                },
                {
                    name: 'twitter',
                    type: 'text',
                },
            ],
        },
    ],
}
