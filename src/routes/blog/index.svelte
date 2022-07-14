<script lang=ts>
   import ContentBlock from '$lib/components/ContentBlock.svelte'
   import type { IEvent } from '$lib/interfaces';
   
   export let events: IEvent[]
</script>

<svelte:head>
   <title>Code Breaker | Events</title>
</svelte:head>

<h1>Events</h1>

<div class="grid lg:grid-cols-2 px-2 gap-2" >
   {#each events as content}
      <ContentBlock {content}/>
   {/each}
</div>

