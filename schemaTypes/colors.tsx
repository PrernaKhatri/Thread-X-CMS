
import { defineField, defineType } from 'sanity'
import ColorWheelIcon from '@sanity/icons/ColorWheel'

export const colors = defineType({
  name: 'colors',
  title: 'Colors',
  type: 'document',
  icon: ColorWheelIcon,

  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value?.trim()) return true

          const client = context.getClient({ apiVersion: '2024-01-01' })
          const currentId = context.document?._id?.replace(/^drafts\./, '')

          const existing = await client.fetch(
            `count(*[
              _type == "colors" &&
              lower(name) == lower($name) &&
              _id != $publishedId &&
              _id != $draftId
            ])`,
            {
              name: value.trim(),
              publishedId: currentId,
              draftId: `drafts.${currentId}`,
            },
          )

          return existing === 0 || 'This color name already exists.'
        }),
    }),

    defineField({
      name: 'hexCode',
      title: 'HEX Color Code',
      type: 'string',
      description: 'Enter HEX code (e.g. #000080)',
      validation: (Rule) =>
        Rule.required()
          .regex(/^#[0-9A-Fa-f]{6}$/, {
            name: 'HEX color',
          })
          .custom(async (value, context) => {
            if (!value?.trim()) return true

            const client = context.getClient({ apiVersion: '2024-01-01' })
            const currentId = context.document?._id?.replace(/^drafts\./, '')

            const existing = await client.fetch(
              `count(*[
                _type == "colors" &&
                lower(hexCode) == lower($hexCode) &&
                _id != $publishedId &&
                _id != $draftId
              ])`,
              {
                hexCode: value.trim(),
                publishedId: currentId,
                draftId: `drafts.${currentId}`,
              },
            )

            return existing === 0 || 'This HEX color code already exists.'
          }),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'hexCode',
      hexCode: 'hexCode',
    },

    prepare({ title, subtitle, hexCode }) {
      return {
        title,
        subtitle,
        media: () => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: hexCode || '#ffffff',
              borderRadius: '50%',
            }}
          />
        ),
      }
    },
  },
})
