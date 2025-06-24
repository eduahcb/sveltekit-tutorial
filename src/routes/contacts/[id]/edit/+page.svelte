<script lang="ts">
  import { enhance } from '$app/forms'
  import type { PageProps } from './$types'


  let { data } : PageProps = $props()
</script>


<form id="contact-form" method="post" action="?/edit" use:enhance>
  <p>
    <span>Name</span>

    <input
      type="text"
      aria-label="First Name"
      name="first"
      placeholder="First"
      value={data.contact.first}
    />

    <input
      type="text"
      aria-label="Last Name"
      name="last"
      placeholder="Last"
      value={data.contact.last}
    />
  </p>

  <label>
    <span>Twitter</span>
    <input 
      type="text"
      name="twitter"
      placeholder="@carlim"
      value={data.contact.twitter}
    />
  </label>

  <label>
    <span>Avatar URL</span>
    <input
      type="text"
      aria-label="Avatar URL"
      name="avatar"
      placeholder="https://example.com/avatar.jpg"
      value={data.contact.avatar}
    />
  </label>

  <label>
    <span>Notes</span>
    <textarea 
      rows="6"
      name="notes"
      value={data.contact.notes}
    ></textarea>
  </label>

  <p>
    <button type="submit">Save</button>
    <button type="button" onclick={() => history.back()}>Cancel</button>
  </p>
</form>
