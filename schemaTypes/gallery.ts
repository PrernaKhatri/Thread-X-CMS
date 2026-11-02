import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons/Images'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImagesIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'gallery' }),
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
