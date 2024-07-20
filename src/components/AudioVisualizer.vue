<template>
  <canvas ref="canvas" width="500" height="200"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  audioElement: HTMLAudioElement
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let animationId: number

onMounted(() => {
  if (!canvas.value) return

  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const analyser = audioContext.createAnalyser()
  const source = audioContext.createMediaElementSource(props.audioElement)
  source.connect(analyser)
  analyser.connect(audioContext.destination)

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const draw = () => {
    const width = canvas.value!.width
    const height = canvas.value!.height
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    analyser.getByteFrequencyData(dataArray)
    ctx.clearRect(0, 0, width, height)

    const barWidth = (width / bufferLength) * 2.5
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height

      ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`
      ctx.fillRect(x, height - barHeight, barWidth, barHeight)

      x += barWidth + 1
    }

    animationId = requestAnimationFrame(draw)
  }

  draw()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>
