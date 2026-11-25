
import { defineArrayMember, defineField, defineType } from 'sanity'
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
      type: 'number',
    }),

    // Category-wise Pricing
    defineField({
      name: 'categoryPricing',
      title: 'Category-wise Pricing',
      type: 'array',
      description: 'Set different prices for this fabric based on product category.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'categoryPrice',
          title: 'Category Price',
          fields: [
            defineField({
              name: 'category',
              title: 'Product Category',
              type: 'reference',
              to: [{ type: 'category' }],
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],

          preview: {
            select: {
              title: 'category.name',
              price: 'price',
            },
            prepare({ title, price }) {
              return {
                title: title || 'Select Category',
                subtitle: price !== undefined ? `₹${price}` : 'Price not set',
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'availableColors',
      title: 'Available Colors',
      type: 'array',
      description: 'Select all available colors for the T-shirt, collar, and tipping.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'colors' }],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'fabricCategory.name',
      media: 'image',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category || '',
        media,
      }
    },
  },
})
