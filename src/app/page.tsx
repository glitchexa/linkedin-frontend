'use client'

import { useState } from 'react'
import QueryForm from '@/components/QueryForm'
import ResultsDisplay from '@/components/ResultsDisplay'

export default function Home() {
  const [queryResults, setQueryResults] = useState(null)
  const [sqlQuery, setSqlQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleQuerySubmit = async (query) => {
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
      
      setQueryResults(data.result)
      setSqlQuery(data.sqlQuery)
    } catch (err) {
      setError(err.message)
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

2 / 4


