import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons/Images'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'T-Shirt Name',
      type: 'string',
      description: 'The display name of the custom t-shirt or uniform',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'T-Shirt Image',
      type: 'image',
      description: 'Upload cutout / model photo of the t-shirt',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Optional sorting number (1, 2, 3...)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
