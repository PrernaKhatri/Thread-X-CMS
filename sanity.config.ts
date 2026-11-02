import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {ImagesIcon} from '@sanity/icons/Images'
import {schemaTypes} from './schemaTypes'

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
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== 'gallery'
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
