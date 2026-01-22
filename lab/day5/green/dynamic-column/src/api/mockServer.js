// Mock API: simulates latency + random failures.
// TODO(Day4): adjust FAIL_RATE and LATENCY_MS during demos.

const LATENCY_MS = { min: 250, max: 900 }
const FAIL_RATE = 0.2 // 20%

const sleep = (ms) => 
    new Promise((r) => setTimeout(r, ms))

const rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min

export async function moveTaskOnServer({ id, toColumn, toIndex }) {
  // TODO(Day4): simulate slow network
  await sleep(rand(LATENCY_MS.min, LATENCY_MS.max))

  // TODO(Day4): simulate occasional server failure
  if (Math.random() < FAIL_RATE) {
    const err = new Error('Server rejected the update (simulated).')
    err.code = 'SIM_FAIL'
    throw err
  }

  // pretend server accepted
  return { 
    ok: true, 
    id, 
    toColumn, 
    toIndex }
}