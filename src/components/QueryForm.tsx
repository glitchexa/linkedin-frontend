'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function QueryForm({ onSubmit, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit(query)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Enter your query</CardTitle>
        <CardDescription>Ask a question about the LinkedIn-like data in natural language</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Show me the top 5 companies with the most employees"
            className="flex-grow"
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}