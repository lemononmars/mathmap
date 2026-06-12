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

</script>

<h1>Hey</h1>