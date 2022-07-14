<script lang=ts>
   import type {IContent} from '$lib/interfaces'
   import {dateToThaiString} from '$lib/utils/date'

   export let content: IContent
</script>

<h1>{content.title}</h1>
<div class="flex flex-row items-center gap-2 mx-auto justify-center">
   <p>วันที่ {dateToThaiString(content.date)}</p>
   <div class="flex flex-row gap-1">
      {#if content.tags}
         {#each content.tags as t}
            <a href="/puzzles/{content.type}?tag={t}"><div class="badge badge-outline">{t}</div></a>
         {/each}
      {/if}
   </div>
</div>

<div class="divider"></div>