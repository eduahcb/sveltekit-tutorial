import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types';

import { getContact, deleteContact } from '$lib/server/api'

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id
  
  const contact = await getContact(id)

  if(!contact){
    error(404, `Contact with id ${id} not found`)
  }

  return { contact }
}

export const actions: Actions = {
  destroy: async ({ params }) => {
    const id = params.id

    await deleteContact(id);

    redirect(303, '/');
  }
} satisfies Actions;



