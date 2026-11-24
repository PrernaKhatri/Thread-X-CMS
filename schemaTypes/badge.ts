
import { defineField, defineType } from 'sanity'
import { DiamondIcon } from '@sanity/icons/Diamond'
export const badge = defineType({
    name: 'badge',
    title: 'Badge',
    type: 'document',
    icon: DiamondIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Badge Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'color',
            title: 'Badge Color',
            type: 'reference',
            to: [{ type: 'colors' }],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'color.name',
        },
    },
})
