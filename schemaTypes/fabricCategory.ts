import { defineField, defineType } from 'sanity'
import { StackIcon } from '@sanity/icons/Stack'
export const fabricCategory = defineType({
    name: 'fabricCategory',
    title: 'Fabric Category',
    type: 'document',
    icon: StackIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Fabric Category Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
})