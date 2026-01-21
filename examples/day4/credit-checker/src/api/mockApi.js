// A tiny fake API to teach the patterns without a backend.
// You can later swap these with real fetch/axios calls.

const wait = (ms) => new Promise((res) => setTimeout(res, ms))

// Deterministic-ish outcome so demos feel consistent:
function decideCheck1({ income, county, hasCCJ }) {
  // simple rules for teaching:
  if (hasCCJ) 
    return { outcome: 'DENIED', reason: 'Recent CCJ detected' }

  if (income >= 35000 && county !== 'HighRisk') 
    return { outcome: 'APPROVED', reason: 'Score OK' }

  return { outcome: 'DOCS_REQUIRED', reason: 'Need payslips + proof of address' }
}

function decideCheck2({ docsUploaded }) {
  if (!docsUploaded) return { outcome: 'DENIED', reason: 'Documents not provided' }
  // once docs exist, approve (teaching-friendly)
  return { outcome: 'APPROVED', reason: 'Docs verified' }
}

export async function runCreditCheck1(applicant) {
  //check1Calls += 1
  //console.log(`[mockApi] runCreditCheck1 call #${check1Calls}`)

  await wait(900) // simulate latency
  // You can simulate random failure:
  // if (Math.random() < 0.1) throw new Error('Network error')
  return decideCheck1(applicant)
}

export async function uploadDocuments() {
  await wait(800)
  return { ok: true, received: ['Payslip.pdf', 'UtilityBill.pdf'] }
}

export async function runCreditCheck2({ docsUploaded }) {
  await wait(900)
  return decideCheck2({ docsUploaded })
}

export async function fetchAgreement({ applicantName }) {
  await wait(600)
  return {
    agreementId: 'AGR-' + Math.random().toString(16).slice(2, 8).toUpperCase(),
    applicantName
  }
}