import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types';

import { getContact, updateContact } from '$lib/server/api'
import type { Contact } from '$lib/server/types'

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id

  const contact = await getContact(id)

  if(!contact){
    error(404, `Contact with id ${id} not found`)
  }

  return { contact }
}

export const actions: Actions = {
  edit: async ({ request, params }) => {
    const id = params.id
    const formData = await request.formData()

    const contact = Object.fromEntries(formData.entries()) as Contact
    await updateContact(id, contact)

    redirect(303, `/contacts/${id}`)
  }
}



