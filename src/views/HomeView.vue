<template>
  <div class="home">
    <h1>Web Audio Keyboard</h1>
    <Login v-if="!isAuthenticated" />
    <template v-else>
      <AudioKeyboard />
      <AudioUploader />
      <AudioPlayer ref="audioPlayer" />
      <AudioVisualizer :audioElement="audioPlayerElement" v-if="audioPlayerElement" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentUser } from 'aws-amplify/auth'
import Login from '@/components/Login.vue'
import AudioKeyboard from '@/components/AudioKeyboard.vue'
import AudioUploader from '@/components/AudioUploader.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import AudioVisualizer from '@/components/AudioVisualizer.vue'

const isAuthenticated = ref(false)
const audioPlayer = ref<InstanceType<typeof AudioPlayer> | null>(null)
const audioPlayerElement = ref<HTMLAudioElement | null>(null)

onMounted(async () => {
  try {
    await getCurrentUser()
    isAuthenticated.value = true
  } catch (error) {
    console.error('Not authenticated:', error)
  }
  
  if (audioPlayer.value) {
    audioPlayerElement.value = audioPlayer.value.$refs.audioPlayer as HTMLAudioElement
  }
})
</script>