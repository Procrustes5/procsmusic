<template>
  <div class="audio-keyboard">
    <div class="keyboard">
      <button
        v-for="(note, index) in notes"
        :key="note.key"
        @mousedown="playNote(note.file)"
        @mouseup="stopNote(noteq.file)"
        @mouseleave="stopNote(note.file)"
        class="key"
        :class="{ black: note.file.at(-1) === '#' }"
      >
        {{ note.key }} ({{ note.file }})
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { initAudio, playNote, stopNote } from '@/utils/audioUtils'

const props = defineProps<{
  audioFiles: any[]
}>()

const audioContext = ref<AudioContext | null>(null)
const volume = ref(0.5)
const notes = ref<{ key: string; file: string }[]>([])
const activeNotes = new Set<string>()

const keyMap: { [key: string]: string } = {
  'a': 'C', 'w': 'C#', 's': 'D', 'e': 'D#', 'd': 'E', 'f': 'F', 't': 'F#', 'g': 'G', 'y': 'G#', 'h': 'A', 'u': 'A#', 'j': 'B',
}

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

watch(() => props.audioFiles, (newFiles) => {
  notes.value = Object.entries(keyMap).map(([key, note], index) => ({
    key: key.toUpperCase(),
    file: newFiles[index]?.filename || note
  }))
}, { immediate: true })

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.repeat) return // Prevent key repeat
  const note = keyToNote(event.key)
  if (note && audioContext.value && !activeNotes.has(note)) {
    playNote(audioContext.value, note, volume.value)
    activeNotes.add(note)
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  const note = keyToNote(event.key)
  if (note && audioContext.value) {
    stopNote(audioContext.value, note)
    activeNotes.delete(note)
  }
}

const keyToNote = (key: string): string | null => {
  return keyMap[key.toLowerCase()] || null
}
</script>

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
.black {
  background: black;
  color: white;
}

.controls {
  display: flex;
  justify-content: center;
}
</style>