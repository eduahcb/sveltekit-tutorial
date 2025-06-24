import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

import { createContract } from '$lib/server/api';

export const actions = {
  create: async() => {
    const contact = await createContract({})
    
    redirect(303, `/contacts/${contact.id}/edit`);
  }
} satisfies Actions;
