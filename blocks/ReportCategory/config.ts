import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ReportCategory: Block = {
  slug: 'reportCategory',
  interfaceName: 'ReportCategoryBlock',
  labels: {
    singular: 'Report Category',
    plural: 'Report Categories',
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'spendingCategories',
      hasMany: false,
      required: true,
      admin: {
        description: 'Select category',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Add a gallery of images for this section.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'altText',
          type: 'text',
          required: true,
          admin: {
            description: 'Alt text for screen readers',
          },
        },
        {
          name: 'caption',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
}
