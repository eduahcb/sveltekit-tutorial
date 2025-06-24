<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let favorite = $derived(data.contact.favorite)
</script>

{#snippet favoriteComponent()}
  <form method="post" action="?/favorite" use:enhance={({ formData }) => {
      favorite = formData.get('favorite') === "true"
      
      return async ({ update }) => {
        await update()
      }
    }}>
    <button
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      name="favorite"
      value={favorite ? "false" : "true"}
    >
      {favorite ? "★" : "☆"}
    </button>
  </form>
{/snippet}


<div id="contact">
  <div>
    <img src={data.contact.avatar || 'https://placehold.co/200'} alt={`${data.contact.first} ${data.contact.last} avatar`}>
  </div>

  <div>
    <h1>
      {#if data.contact.first || data.contact.last}
        {data.contact.first} {data.contact.last}
      {:else}
        <i>No Name</i>
      {/if}

      {@render favoriteComponent()}
    </h1>

    {#if data.contact.twitter}
      <p>
        <a href={`https://twitter.com/${data.contact.twitter}`}>{data.contact.twitter}</a>
      </p>
    {/if}

    {#if data.contact.notes}
      <p>{data.contact.notes}</p>
    {/if}

    <div>
      <form action={`/contacts/${data.contact.id}/edit`} method="get">
        <button type="submit">Edit</button>
      </form>

      <form action="?/destroy" method="post" use:enhance>
        <button type="submit">Delete</button>
      </form>
    </div>
  </div>
</div>
