import { getUrl } from 'aws-amplify/storage'

let audioContext: AudioContext
let oscillators: { [key: string]: OscillatorNode | AudioBufferSourceNode } = {}
let gainNodes: { [key: string]: GainNode } = {}
let audioBuffers: { [key: string]: AudioBuffer } = {}

export const initAudio = (context: AudioContext) => {
  audioContext = context
}

export const playNote = async (context: AudioContext, note: string, volume: number) => {
  if (audioBuffers[note]) {
    const source = context.createBufferSource()
    source.buffer = audioBuffers[note]
    const gainNode = context.createGain()
    gainNode.gain.setValueAtTime(volume, context.currentTime)
    source.connect(gainNode)
    gainNode.connect(context.destination)
    source.start()
    oscillators[note] = source
    gainNodes[note] = gainNode
  } else {
    const freq = noteToFreq(note)
    if (freq) {
      const oscillator = context.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, context.currentTime)
      const gainNode = context.createGain()
      gainNode.gain.setValueAtTime(volume, context.currentTime)
      oscillator.connect(gainNode)
      gainNode.connect(context.destination)
      oscillator.start()
      oscillators[note] = oscillator
      gainNodes[note] = gainNode
    }
  }
}

export const stopNote = (context: AudioContext, note: string) => {
  if (oscillators[note]) {
    const oscillator = oscillators[note]
    const gainNode = gainNodes[note]
    gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5)
    if (oscillator instanceof OscillatorNode) {
      oscillator.stop(context.currentTime + 0.5)
    } else {
      oscillator.stop()
    }
    delete oscillators[note]
    delete gainNodes[note]
  }
}

export const loadAudioFile = async (filename: string) => {
  try {
    const { url } = await getUrl({
      key: filename,
      options: {
        validateObjectExistence: true
      }
    })
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    audioBuffers[filename] = audioBuffer
    console.log(`Loaded audio file: ${filename}`)
  } catch (error) {
    console.error('Error loading audio file:', error)
  }
}

const noteToFreq = (note: string): number | null => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const octave = 4
  const halfSteps = notes.indexOf(note)
  if (halfSteps === -1) return null
  return 440 * Math.pow(2, (halfSteps - 9) / 12 + (octave - 4))
}