<template>
  <div class="home">
    <h1>Web Audio Keyboard</h1>
    <AudioKeyboard />
    <AudioUploader />
    <AudioPlayer />
  </div>
</template>

<script setup lang="ts">
import AudioKeyboard from '@/components/AudioKeyboard.vue'
import AudioUploader from '@/components/AudioUploader.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
</script>
