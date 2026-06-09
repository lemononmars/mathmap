<script lang=ts>
   import {getImageURL} from '$lib/supabase'
   import { onMount } from 'svelte';
   let md: any
   export let content

   onMount(async() =>{
      md = content
   })
   
</script>

<div class="flex flex-col gap-2">
   <div>
      <img src="{getImageURL('events', content.image)}" class="w-full h-60 object-cover" alt="img">
   </div>
   <h1>{content.title}</h1>
   <div class="flex flex-row gap-2 mx-auto items-center">
      <p>{content.date}</p>
      {#if content.tags}
         {#each content.tags as t}
            <div class="badge badge-outline">{t}</div>
         {/each}
      {/if}
   </div>
   <div class="divider"></div>
</div>

{#if md}
<div class="text-left">
   <svelte:component this={md}/>
</div>
{/if}