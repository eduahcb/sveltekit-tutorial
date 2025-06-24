<script lang="ts">
  import { navigating, page } from '$app/state';
  import { enhance } from '$app/forms'
  import type { LayoutProps } from './$types'

  let { data, children }: LayoutProps = $props()
  
  let isNavigating = $derived(navigating !== null && navigating?.to !== null)

  let form: HTMLFormElement | null = null;

  let hasSearch = $derived(page.url.searchParams.has('q'));

  let isSearching = $derived(isNavigating && hasSearch);
</script>


<div id="sidebar">
  <h1>Sveltekit Contacts</h1>

  <div>
    <form bind:this={form} id="searc-form" role="search" data-sveltekit-keepfocus>
      <input 
        oninput={() => form?.requestSubmit()} 
        id="q" 
        aria-label="Search contacts" 
        placeholder="Search" 
        type="search" name="q"
        class={[isSearching ? 'loading' : '']}
        value={data.q || ''}
      >
      <div id="search-spinner" aria-hidden="true" hidden={!isSearching}></div>
    </form>

    <form method="post" action="/?/create" use:enhance>
      <button type="submit">New</button>
    </form>
  </div>

  <nav>
    {#each data.contacts as contact (contact.id)}
      {@const url = `/contacts/${contact.id}`}
      {@const isActive = page.url.pathname === url}
      {@const isPending = navigating && navigating.to?.url.pathname.includes(url)}

      <li>
        <a href={`/contacts/${contact.id}`} class={[isActive ? 'active' : isPending ? 'pending' : '']}>
          {#if contact.first || contact.last}
            {contact.first} {contact.last}
          {:else}
            <i>No Name</i>
          {/if}

          {#if contact.favorite}
            <span>★</span>
          {/if}
        </a>
      </li> 
    {/each}
  </nav>
</div>

<div id="detail" class={[isNavigating ? 'loading' : '']}>
  {@render children()}
</div>

<svelte:head>
  <link rel="stylesheet" href="/app.css">
</svelte:head>
