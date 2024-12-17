'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LookerReportPage() {
  const lookerReportUrl =
    'https://lookerstudio.google.com/embed/reporting/f439e14b-51e3-4293-abed-91153e2f593a/page/tdXZE'

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Looker Studio Report</CardTitle>
          <CardDescription>
            Explore your analytics data with this interactive Looker Studio report.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <iframe
            src={lookerReportUrl}
            width="100%"
            height="700px"
            style={{ border: 'none' }}
            allowFullScreen
            title="Looker Studio Report"
          ></iframe>
        </CardContent>
      </Card>
    </div>
  )
}
