import {defineMigration, at, setIfMissing} from 'sanity/migrate'

export default defineMigration({
  title: 'Populate Back Catalog Thumbnail from Back Base Mask',
  documentTypes: ['product'],
  filter: 'defined(masks.backBase) && !defined(backImage)',
  migrate: {
    document(doc: any) {
      if (!doc.masks?.backBase || doc.backImage) return
      return [
        at('backImage', setIfMissing(doc.masks.backBase)),
      ]
    },
  },
})
