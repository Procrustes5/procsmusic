<template>
  <div class="home">
    <h1>Web Audio Keyboard</h1>
    <Login v-if="!isAuthenticated" />
    <template v-else>
      <AudioKeyboard :audioFiles="audioFiles" />
      <AudioUploader @file-uploaded="handleFileUploaded" />
      <AudioPlayer ref="audioPlayer" />
      <AudioVisualizer :audioElement="audioPlayerElement" v-if="audioPlayerElement" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getCurrentUser } from 'aws-amplify/auth'
import Login from '@/components/Login.vue'
import AudioKeyboard from '@/components/AudioKeyboard.vue'
import AudioUploader from '@/components/AudioUploader.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import AudioVisualizer from '@/components/AudioVisualizer.vue'
import { loadAudioFile } from '@/utils/audioUtils'

const isAuthenticated = ref(false)
const audioPlayer = ref<InstanceType<typeof AudioPlayer> | null>(null)
const audioPlayerElement = ref<HTMLAudioElement | null>(null)
const audioFiles = ref<any[]>([])
const audioContext = ref<AudioContext | null>(null)

onMounted(async () => {
  try {
    await getCurrentUser()
    isAuthenticated.value = true

    // Create and activate AudioContext
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
    await audioContext.value.resume()
  } catch (error) {
    console.error('Error:', error)
  }
})

watch(audioPlayer, () => {
  if (audioPlayer.value) {
    audioPlayerElement.value = audioPlayer.value.audioPlayer
    audioFiles.value = audioPlayer.value.audioFiles
  }
}, { immediate: true })

const handleFileUploaded = async (file: any) => {
  if (audioPlayer.value) {
    audioPlayer.value.audioFiles.push(file)
    await loadAudioFile(file.filename)
  }
}
</script>