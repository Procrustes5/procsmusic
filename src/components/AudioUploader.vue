<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="audio/*" />
    <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { uploadData } from 'aws-amplify/storage'
import { generateClient } from 'aws-amplify/api'
import { createAudioFile } from '../graphql/mutations'

const client = generateClient()
const selectedFile = ref<File | null>(null)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFile.value = target.files[0]
  }
}

const uploadFile = async () => {
  if (!selectedFile.value) return

  try {
    const result = await uploadData({
      key: selectedFile.value.name,
      data: selectedFile.value,
      options: {
        contentType: selectedFile.value.type
      }
    }).result
    console.log('Upload successful:', result)

    // Save metadata
    await client.graphql({
      query: createAudioFile,
      variables: {
        input: {
          filename: selectedFile.value.name,
          uploadedBy: 'currentUser', // Replace with actual user info
          createdAt: new Date().toISOString()
        }
      }
    })

    console.log('Metadata saved successfully')
    // 여기에 업로드 성공 후 처리 로직 추가
  } catch (error) {
    console.error('Upload or metadata saving failed:', error)
    // 여기에 에러 처리 로직 추가
  }
}
</script>
