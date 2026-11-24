
import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'

export const fabric = defineType({
  name: 'fabric',
  title: 'Fabric',
  type: 'document',
  icon: PackageIcon,

  fields: [
    defineField({
      name: 'name',
      title: 'Fabric Name',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'fabricCategory',
      title: 'Fabric Category',
      type: 'reference',
      to: [{ type: 'fabricCategory' }],
      // validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Fabric Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'gsm',
      title: 'GSM',
      type: 'string',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
  ],

 preview: {
    select: {
      title: 'name',
      category: 'fabricCategory.name',
      price: 'price',
      media: 'image',
    },
    prepare({ title, category, price, media }) {
      const priceText = price ? `₹${price}` : ''
      return {
        title,
        subtitle: [category, priceText].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})
