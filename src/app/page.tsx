// 'use client'

// import { useState } from 'react'
// import QueryForm from '@/components/QueryForm'
// import ResultsDisplay from '@/components/ResultsDisplay'

// export default function Home() {
//   const [queryResults, setQueryResults] = useState<Record<string, any>[]>([])
//   const [sqlQuery, setSqlQuery] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string>('')

//   const handleQuerySubmit = async (query: string) => {
//     setLoading(true)
//     setError('')
    
//     try {
//       const response = await fetch('/api/query', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query }),
//       })
      
//       const data = await response.json()
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to fetch results')
//       }
      
//       setQueryResults(data.result || []) // Fallback to an empty array
//       setSqlQuery(data.sqlQuery || '')
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message)
//       } else {
//         setError('An unknown error occurred')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-8 text-center">LinkedIn-like Analytics</h1>
//       <QueryForm onSubmit={handleQuerySubmit} loading={loading} />
//       {error && (
//         <div className="text-red-500 mb-4 text-center">{error}</div>
//       )}
//       <ResultsDisplay data={queryResults} sqlQuery={sqlQuery} />
//     </main>
//   )
// }

'use client'

import { useState } from 'react'
import QueryForm from '@/components/QueryForm'
import ResultsDisplay from '@/components/ResultsDisplay'

interface QueryResult {
  id: number
  name: string
  value: string
}

export default function Home() {
  const [queryResults, setQueryResults] = useState<QueryResult[]>([])
  const [sqlQuery, setSqlQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleQuerySubmit = async (query: string) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch results')
      }
      
      setQueryResults(data.result || []) // Fallback to an empty array
      setSqlQuery(data.sqlQuery || '')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">LinkedIn-like Analytics</h1>
      <QueryForm onSubmit={handleQuerySubmit} loading={loading} />
      {error && (
        <div className="text-red-500 mb-4 text-center">{error}</div>
      )}
      <ResultsDisplay data={queryResults} sqlQuery={sqlQuery} />
    </main>
  )
}
