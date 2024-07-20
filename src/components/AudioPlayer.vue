<template>
  <div>
    <h2>Uploaded Audio Files</h2>
    <ul>
      <li v-for="file in audioFiles" :key="file.key">
        {{ file.key }}
        <button @click="playAudio(file.key)">Play</button>
      </li>
    </ul>
    <audio ref="audioPlayer" controls></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { list, getUrl } from 'aws-amplify/storage'

const audioFiles = ref<{ key: string }[]>([])
const audioPlayer = ref<HTMLAudioElement | null>(null)

onMounted(async () => {
  try {
    const result = await list({
      options: {
        listAll: true
      }
    }).result
    audioFiles.value = result.items
  } catch (error) {
    console.error('Error fetching audio files:', error)
  }
})

const playAudio = async (key: string) => {
  try {
    const result = await getUrl({
      key: key
    }).result
    if (audioPlayer.value && result.url) {
      audioPlayer.value.src = result.url
      audioPlayer.value.play()
    }
  } catch (error) {
    console.error('Error playing audio:', error)
  }
}
</script>
