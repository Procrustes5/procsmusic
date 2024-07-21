<template>
  <div>
    <h2>Uploaded Audio Files</h2>
    <ul>
      <li v-for="file in audioFiles" :key="file.id">
        {{ file.filename }}
        <span>
          (Uploaded by: {{ file.uploadedBy }}, Date:
          {{ new Date(file.createdAt).toLocaleDateString() }})
        </span>
        <button @click="playAudio(file.filename)">Play</button>
      </li>
    </ul>
    <audio ref="audioPlayer" controls></audio>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUrl, GetUrlOutput } from 'aws-amplify/storage'
import { generateClient } from 'aws-amplify/api'
import { listAudioFiles } from '../graphql/queries'
import { Amplify } from 'aws-amplify'

const client = generateClient()
const audioFiles = ref<any[]>([])
const audioPlayer = ref<HTMLAudioElement | null>(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const result = await client.graphql({ query: listAudioFiles })
    audioFiles.value = result.data.listAudioFiles.items
    console.log('Audio files:', audioFiles.value)
  } catch (error) {
    console.error('Error fetching audio files:', error)
    errorMessage.value = 'Failed to fetch audio files. Please try again.'
  }
})

const playAudio = async (filename: string) => {
  try {
    console.log('Attempting to play:', filename)

    // 파일 경로 로깅
    const filePath = `${filename}`
    console.log('Full file path:', filePath)

    const { url } = await getUrl({
      key: filePath,
      options: {
        accessLevel: 'public',
        validateObjectExistence: true
      }
    })

    console.log('Retrieved URL:', url)

    if (audioPlayer.value && url) {
      audioPlayer.value.src = url
      audioPlayer.value.play()
    } else {
      throw new Error('Audio player or URL is not available')
    }
  } catch (error) {
    console.error('Error playing audio:', error)
    errorMessage.value = `Failed to play audio: ${error.message || 'Unknown error'}`
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>