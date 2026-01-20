import React from 'react'

const CreditContext = React.createContext(null)

// Flow statuses: IDLE -> CHECK1_PENDING -> CHECK1_DONE -> DOCS_UPLOADED -> CHECK2_PENDING -> DECISION_READY
const initialState = {
  applicant: {
    name: '',
    income: 30000,
    county: 'London',
    hasCCJ: false
  },
  check1: { status: 'IDLE', outcome: null, reason: null },
  docs: { uploaded: false, files: [] },
  check2: { status: 'IDLE', outcome: null, reason: null },
  agreement: { status: 'IDLE', agreementId: null },
  error: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_APPLICANT_FIELD': {
      const { field, value } = action.payload
      return { ...state, applicant: { ...state.applicant, [field]: value } }
    }

    case 'CHECK1_START':
      return { ...state, check1: { status: 'PENDING', outcome: null, reason: null }, error: null }

    case 'CHECK1_SUCCESS':
      return { ...state, check1: { status: 'DONE', ...action.payload }, error: null }

    case 'DOCS_UPLOADED':
      return { ...state, docs: { uploaded: true, files: action.payload.files }, error: null }

    case 'CHECK2_START':
      return { ...state, check2: { status: 'PENDING', outcome: null, reason: null }, error: null }

    case 'CHECK2_SUCCESS':
      return { ...state, check2: { status: 'DONE', ...action.payload }, error: null }

    case 'AGREEMENT_START':
      return { ...state, agreement: { status: 'PENDING', agreementId: null }, error: null }

    case 'AGREEMENT_SUCCESS':
      return { ...state, agreement: { status: 'DONE', agreementId: action.payload.agreementId }, error: null }

    case 'SET_ERROR':
      return { ...state, error: action.payload.message }

    case 'RESET_FLOW':
      return initialState

    default:
      return state
  }
}

export function CreditProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const value = React.useMemo(() => ({ state, dispatch }), [state])

  return <CreditContext.Provider value={value}>{children}</CreditContext.Provider>
}

export function useCredit() {
  const ctx = React.useContext(CreditContext)
  if (!ctx) throw new Error('useCredit must be used within <CreditProvider>')
  return ctx
}