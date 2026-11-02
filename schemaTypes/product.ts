import { defineArrayMember, defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'

export const product = defineType({
  name: 'product',
  title: 'Customizable Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
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
    // Customizer Masks (Replacing ACF front_base, front_body, front_collar, etc.)
    defineField({
      name: 'masks',
      title: 'Customizer Mask Layers',
      type: 'object',
      fields: [
        defineField({ name: 'frontBase', title: 'Front Base Mask (PNG)', type: 'image' }),
        defineField({ name: 'frontBody', title: 'Front Body Mask (PNG)', type: 'image' }),
        defineField({ name: 'frontCollar', title: 'Front Collar Mask (PNG)', type: 'image' }),
        defineField({ name: 'tippingFrontSingle', title: 'Front Single Tipping Mask (PNG)', type: 'image' }),
        defineField({ name: 'tippingFrontDouble', title: 'Front Double Tipping Mask (PNG)', type: 'image' }),
        defineField({ name: 'tippingFrontTriple', title: 'Front Triple Tipping Mask (PNG)', type: 'image' }),
        defineField({ name: 'backBase', title: 'Back Base Mask (PNG)', type: 'image' }),
        defineField({ name: 'backBody', title: 'Back Body Mask (PNG)', type: 'image' }),
        defineField({ name: 'backCollar', title: 'Back Collar Mask (PNG)', type: 'image' }),
        defineField({ name: 'tippingBackSingle', title: 'Back Single Tipping Mask (PNG)', type: 'image' }),
        defineField({ name: 'tippingBackDouble', title: 'Back Double Tipping Mask (PNG)', type: 'image' }),
        defineField({ name: 'tippingBackTriple', title: 'Back Triple Tipping Mask (PNG)', type: 'image' }),
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
    },
    prepare({ title, basePrice, media }) {
      return {
        title,
        subtitle: basePrice ? `₹${basePrice}` : undefined,
        media,
      }
    },
  },
})
