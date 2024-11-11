'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { FileX2 } from 'lucide-react'

export default function ResultsDisplay({ data, sqlQuery }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
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
    ) : null;
  }

  const renderChart = () => {
    if (!data || data.length === 0) return null;

    const chartData = data.map((item) => ({
      name: item.name || item.location || item.job_title || item.degree || Object.values(item)[0],
      value: typeof item.count !== 'undefined' ? item.count : 
             typeof item.avg_grade !== 'undefined' ? item.avg_grade :
             typeof item.total !== 'undefined' ? item.total :
             Number(Object.values(item)[1]) || 1,
    }));

    // Only render chart if we have numeric values
    if (!chartData.some(item => typeof item.value === 'number')) {
      return null;
    }

    if (chartData.length <= 5) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={70}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
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
        {renderChart()}
        <div className="mt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, i) => (
                    <TableCell key={i}>
                      {value instanceof Date 
                        ? value.toLocaleDateString()
                        : String(value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
