import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const ids: string[] = await client.fetch(
    `*[_type == "product" && !defined(isFeatured)]._id`
  )

  const tx = client.transaction()
  ids.forEach((id) => tx.patch(id, { set: { isFeatured: false } }))
  await tx.commit()

  console.log(`Updated ${ids.length} products`)
}

run()