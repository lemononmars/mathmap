<script lang=ts>

   import {onDestroy, onMount} from 'svelte'
   import Phaser from 'phaser'

   let game 

   onMount(async()=>{
      var config = {
         type: Phaser.AUTO,
         backgroundColor: 0x4488aa,
         width: 800,
         height: 600,
         scene: {}
      };

      game = new Phaser.Game(config);
   })

   onDestroy(async() => {
      game = null
   })
   
   // class Scene extends Phaser.Scene {
   
   //    preload ()
   //    {
   //    }

   //    create ()
   //    {
   //       // this.deck = Phaser.Utils.Array.NumberArray(0, 51);
   //    }

   //    update ()
   //    {
   //    }
   // }

</script>

<!-- <svelte:head>
   <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js" defer></script>
</svelte:head>> -->

<h1>Hey</h1>