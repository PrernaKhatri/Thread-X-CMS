
import { defineArrayMember, defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'

export const product = defineType({
  name: 'product',
  title: 'Customizable Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
    name: 'isFeatured',
    title: 'Featured Product',
    type: 'boolean',
    initialValue: false,
    description: 'Enable this to display the product as a featured product.',
  }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productName',
      title: 'Name of Product',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productSlug',
      title: 'Product Slug',
      type: 'slug',
      options: { source: 'productName' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'fabric',
      title: 'Fabric',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'fabric' }],
        }),
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Product Badge',
      type: 'reference',
      to: [{ type: 'badge' }],
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'frontImage',
      title: 'Front Catalog Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backImage',
      title: 'Back Catalog Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),

    // Customizer Masks (Existing)
    defineField({
      name: 'masks',
      title: 'Customizer Mask Layers',
      type: 'object',
      fields: [
        defineField({ name: 'frontBase', title: 'Front Base Mask (PNG)', type: 'image' }),
        defineField({ name: 'frontBody', title: 'Front Body Mask (PNG)', type: 'image' }),
        defineField({ name: 'frontCollar', title: 'Front Collar Mask (PNG)', type: 'image' }),
        defineField({
          name: 'tippingFrontSingle',
          title: 'Front Single Tipping Mask (PNG)',
          type: 'image',
          description: 'Upload mask to show Single Stripe Collar Tipping option in the front-end customizer.',
        }),
        defineField({
          name: 'tippingFrontDouble',
          title: 'Front Double Tipping Mask (PNG)',
          type: 'image',
          description: 'Upload mask to show Double Stripe Collar Tipping option in the front-end customizer.',
        }),
        defineField({
          name: 'tippingFrontTriple',
          title: 'Front Triple Tipping Mask (PNG)',
          type: 'image',
          description: 'Upload mask to show Triple Stripe Collar Tipping option in the front-end customizer.',
        }),
        defineField({ name: 'backBase', title: 'Back Base Mask (PNG)', type: 'image' }),
        defineField({ name: 'backBody', title: 'Back Body Mask (PNG)', type: 'image' }),
        defineField({ name: 'backCollar', title: 'Back Collar Mask (PNG)', type: 'image' }),
        defineField({
          name: 'tippingBackSingle',
          title: 'Back Single Tipping Mask (PNG)',
          type: 'image',
          description: 'Back view Single Stripe mask.',
        }),
        defineField({
          name: 'tippingBackDouble',
          title: 'Back Double Tipping Mask (PNG)',
          type: 'image',
          description: 'Back view Double Stripe mask.',
        }),
        defineField({
          name: 'tippingBackTriple',
          title: 'Back Triple Tipping Mask (PNG)',
          type: 'image',
          description: 'Back view Triple Stripe mask.',
        }),
      ],
    }),

    // Additional Masks
    defineField({
      name: 'additionalMasks',
      title: 'Additional Mask Variations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'additionalMask',
          title: 'Additional Mask',
          fields: [
            defineField({
              name: 'base',
              title: 'Base Mask (PNG)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload the base mask for this additional customization.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body Mask (PNG)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload the body mask for this additional customization.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'collar',
              title: 'Collar Mask (PNG)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload the collar mask for this additional customization.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tippingSingle',
              title: 'Single Tipping Mask (PNG)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload mask to show Single Stripe Tipping option in the front-end customizer.',
            }),
            defineField({
              name: 'tippingDouble',
              title: 'Double Tipping Mask (PNG)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload mask to show Double Stripe Tipping option in the front-end customizer.',
            }),
            defineField({
              name: 'tippingTriple',
              title: 'Triple Tipping Mask (PNG)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload mask to show Triple Stripe Tipping option in the front-end customizer.',
            }),
          ],
        }),
      ],
    }),


    // Available Colorways / Variants
    defineField({
      name: 'colorways',
      title: 'Colorways & Variations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'colorway',
          title: 'Colorway',
          fields: [
            defineField({ name: 'name', title: 'Colorway Name (e.g. Navy / White)', type: 'string' }),
            defineField({ name: 'sku', title: 'SKU', type: 'string' }),
            defineField({ name: 'bodyColor', title: 'Body Color (Hex or Name)', type: 'string' }),
            defineField({ name: 'collarColor', title: 'Collar Color (Hex or Name)', type: 'string' }),
            defineField({ name: 'previewFront', title: 'Front Preview Image', type: 'image' }),
            defineField({ name: 'previewBack', title: 'Back Preview Image', type: 'image' }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'sku',
              media: 'previewFront',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
  select: {
    title: 'name',
    basePrice: 'basePrice',
    media: 'frontImage',
    isFeatured: 'isFeatured',
  },
  prepare({ title, basePrice, media, isFeatured }) {
    const price = basePrice ? `₹${basePrice}` : ''
    return {
      title: title,
      subtitle: isFeatured ? `Featured${price ? ` • ${price}` : ''}` : price || undefined,
      media,
    }
  },
},
})
