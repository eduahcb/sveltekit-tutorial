import type { LayoutServerLoad } from './$types'

import { getContacts } from '$lib/server/api'

export const load: LayoutServerLoad = async ({ url }) => {
  const q = url.searchParams.get('q')?.toLowerCase() ?? ''

  const contacts = await getContacts(q)

  return {
    contacts,
    q
  }
}

