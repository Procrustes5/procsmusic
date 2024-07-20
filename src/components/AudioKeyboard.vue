<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { initAudio, playNote, stopNote } from '@/utils/audioUtils'

const audioContext = ref<AudioContext | null>(null)
const volume = ref(0.5)
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

onMounted(() => {
  audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
  initAudio(audioContext.value)
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})

const handleKeyDown = (event: KeyboardEvent) => {
  const note = keyToNote(event.key)
  if (note && audioContext.value) playNote(audioContext.value, note, volume.value)
}

const handleKeyUp = (event: KeyboardEvent) => {
  const note = keyToNote(event.key)
  if (note && audioContext.value) stopNote(audioContext.value, note)
}

const keyToNote = (key: string): string | null => {
  const keyMap: { [key: string]: string } = {
    a: 'C',
    s: 'D',
    d: 'E',
    f: 'F',
    g: 'G',
    h: 'A',
    j: 'B'
  }
  return keyMap[key.toLowerCase()] || null
}
</script>

<template>
  <div class="audio-keyboard">
    <div class="keyboard">
      <button
        v-for="note in notes"
        :key="note"
        @mousedown="playNote(note)"
        @mouseup="stopNote(note)"
        @mouseleave="stopNote(note)"
        class="key"
      >
        {{ note }}
      </button>
    </div>
    <div class="controls">
      <label>
        Volume:
        <input type="range" v-model="volume" min="0" max="1" step="0.1" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.audio-keyboard {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.keyboard {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.key {
  width: 50px;
  height: 100px;
  font-size: 18px;
  background-color: white;
  border: 1px solid #ccc;
  cursor: pointer;
}

.controls {
  display: flex;
  justify-content: center;
}
</style>
