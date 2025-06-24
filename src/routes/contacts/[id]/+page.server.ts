import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types';

import { getContact, deleteContact, updateContact } from '$lib/server/api'

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
  },
  favorite: async({ request, params }) => {
    const id = params.id

    const formData = await request.formData();

    const favorite = formData.get('favorite') === "true"

    await updateContact(id, { favorite });
  }
} satisfies Actions;



