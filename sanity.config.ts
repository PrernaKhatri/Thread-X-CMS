import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { ImagesIcon } from '@sanity/icons/Images'
import { PackageIcon } from '@sanity/icons/Package'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Thread-X',

  projectId: '78azubcd',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            ...S.documentTypeListItems()
              .filter((listItem) => listItem.getId() !== 'gallery')
              .map((listItem) =>
                listItem.getId() === 'product'
                  ? S.listItem()
                      .id('product')
                      .title('Customizable Product')
                      .icon(PackageIcon)
                      .child(
                        S.documentTypeList('product')
                          .title('Customizable Product')
                          .defaultOrdering([
                            { field: 'isFeatured', direction: 'desc' },
                            { field: '_createdAt', direction: 'desc' },
                          ])
                      )
                  : listItem
              ),
            orderableDocumentListDeskItem({
              type: 'gallery',
              title: 'Gallery',
              icon: ImagesIcon,
              S,
              context,
            }),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})