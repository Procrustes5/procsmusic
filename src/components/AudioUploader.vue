<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="audio/*" />
    <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { uploadData } from 'aws-amplify/storage'

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
    // 여기에 업로드 성공 후 처리 로직 추가
  } catch (error) {
    console.error('Upload failed:', error)
    // 여기에 에러 처리 로직 추가
  }
}
</script>
