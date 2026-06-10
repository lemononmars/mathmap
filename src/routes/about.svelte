<script lang=ts>
   import katex from 'katex'
   import {randrange} from '$lib/math/random'
   import {toPolyString} from '$lib/math/polynomial'
   import {onMount} from 'svelte'
   // import Test from '$lib/md/test.md'

   import JXG from 'jsxgraph'
   let x = $state(randrange(-5, 5));
   let y = $state(randrange(-5, 5));
   let question = $derived(katex.renderToString(toPolyString([1,-x-y,x*y]) + '=0'));
   let solution = $derived(katex.renderToString(`x = ${x}, \\quad x = ${y}`));

   function generate(){
      x = randrange(-5, 5)
      y = randrange(-5, 5)

      currentPoint = b.create('point', [x,y], {fixed: false, visible:true})
   }

   let b: any
   let currentPoint: any

   onMount(async()=>{
      b = (window as any).JXG.JSXGraph.initBoard('jxgbox', {
         boundingbox: [-5, 5, 5, -5], axis:true
      })
      var c = b.create('circle',[[0,1],[1,0]],{dash:2,strokeWidth:1,strokeOpacity:0.6});
   })

</script>

<svelte:head>
   <title>About</title>
</svelte:head>

<h1>Bio</h1>
<p>Sakulbuth Ekvittayaniphon</p>

<div class="flex flex-row">
   <div class="flex flex-col gap-4">

      <div class="btn btn-link" on:click={generate}>New problem please!</div>

      {@html question}

      <div class="divider"></div>

      {@html solution}
   </div>
   <div id="jxgbox" class="jxgbox w-1/2" style="width:500px; height:500px">
   </div>
</div>