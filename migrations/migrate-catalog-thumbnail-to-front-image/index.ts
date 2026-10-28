import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Migrate Catalog Thumbnail to Front Image',
  documentTypes: ['product'],
  filter: 'defined(mainImage) && !defined(frontImage)',
  migrate: {
    document(doc) {
      if (!doc.mainImage || doc.frontImage) return
      return [
        at('frontImage', setIfMissing(doc.mainImage)),
        at('mainImage', unset()),
      ]
    },
  },
})
