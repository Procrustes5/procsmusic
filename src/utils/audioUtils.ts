let audioContext: AudioContext
let oscillator: OscillatorNode | null = null
let gainNode: GainNode

export const initAudio = (context: AudioContext): void => {
  audioContext = context
  gainNode = audioContext.createGain()
  gainNode.connect(audioContext.destination)
}

export const playNote = (context: AudioContext, note: string, volume: number): void => {
  const freq = noteToFreq(note)
  if (freq === null) return

  oscillator = context.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(freq, context.currentTime)

  gainNode.gain.setValueAtTime(volume, context.currentTime)

  oscillator.connect(gainNode)
  oscillator.start()
}

export const stopNote = (): void => {
  if (oscillator) {
    oscillator.stop()
    oscillator.disconnect()
    oscillator = null
  }
}

const noteToFreq = (note: string): number | null => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const octave = 4 // 중간 C를 기준으로
  const halfSteps = notes.indexOf(note)

  if (halfSteps === -1) return null

  return 440 * Math.pow(2, (halfSteps - 9) / 12 + (octave - 4))
}
