<template>
  <div>
    <h2>Uploaded Audio Files</h2>
    <ul>
      <li v-for="file in audioFiles" :key="file.id">
        {{ file.filename }}
        <span
          >(Uploaded by: {{ file.uploadedBy }}, Date:
          {{ new Date(file.createdAt).toLocaleDateString() }})</span
        >
        <button @click="playAudio(file.filename)">Play</button>
      </li>
    </ul>
    <audio ref="audioPlayer" controls></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUrl } from 'aws-amplify/storage'
import { generateClient } from 'aws-amplify/api'
import { listAudioFiles } from '../graphql/queries'

const client = generateClient()
const audioFiles = ref<any[]>([])
const audioPlayer = ref<HTMLAudioElement | null>(null)

onMounted(async () => {
  try {
    const result = await client.graphql({ query: listAudioFiles })
    audioFiles.value = result.data.listAudioFiles.items
  } catch (error) {
    console.error('Error fetching audio files:', error)
  }
})

const playAudio = async (filename: string) => {
  try {
    const result = await getUrl({
      key: filename
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
