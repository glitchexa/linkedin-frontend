'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileX2 } from 'lucide-react'

// // Define types for the props
// interface ResultsDisplayProps {
//   data: Array<Record<string, any>> // Array of objects with dynamic keys
//   sqlQuery: string
// }

// export default function ResultsDisplay({ data, sqlQuery }: ResultsDisplayProps) {
//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return sqlQuery ? (
//       <Card>
//         <CardHeader>
//           <CardTitle>Query Results</CardTitle>
//           <CardDescription className="font-mono text-sm whitespace-pre-wrap break-words">
//             {sqlQuery}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
//           <FileX2 className="h-12 w-12 mb-4" />
//           <p>No results found for this query</p>
//         </CardContent>
//       </Card>
//     ) : null
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Query Results</CardTitle>
//         <CardDescription className="font-mono text-sm whitespace-pre-wrap break-words">
//           {sqlQuery}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="mt-6 overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {Object.keys(data[0]).map((key) => (
//                   <TableHead key={key}>{key}</TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.map((row, index) => (
//                 <TableRow key={index}>
//                   {Object.values(row).map((value, i) => (
//                     <TableCell key={i}>
//                       {value instanceof Date
//                         ? value.toLocaleDateString()
//                         : String(value)}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

interface QueryResult {
  id: number
  name: string
  value: string
}

interface ResultsDisplayProps {
  data: QueryResult[] // Explicitly use QueryResult[]
  sqlQuery: string
}

export default function ResultsDisplay({ data, sqlQuery }: ResultsDisplayProps) {
  if (!data || data.length === 0) {
    return sqlQuery ? (
      <Card>
        <CardHeader>
          <CardTitle>Query Results</CardTitle>
          <CardDescription className="font-mono text-sm whitespace-pre-wrap break-words">
            {sqlQuery}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <FileX2 className="h-12 w-12 mb-4" />
          <p>No results found for this query</p>
        </CardContent>
      </Card>
    ) : null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Query Results</CardTitle>
        <CardDescription className="font-mono text-sm whitespace-pre-wrap break-words">
          {sqlQuery}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Table headers match the keys of QueryResult */}
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
