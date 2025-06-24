import type { LayoutServerLoad } from './$types'

import { getContacts } from '$lib/server/api'

export const load: LayoutServerLoad = async () => {
  const contacts = await getContacts()

  return {
    contacts
  }
}

