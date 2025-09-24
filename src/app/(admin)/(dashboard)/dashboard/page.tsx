'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { format } from "date-fns";

import SiteHeader from "@/components/admin/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const fetchLastCrawl = async () => {
  const response = await fetch('/api/crawl')

  if (!response.ok)
    throw new Error('Unable to fetch')

  return response.json()
}

const triggerCrawl = async () => {
  const response = await fetch('/api/crawl', { method: "POST" })

  if (!response.ok)
    throw new Error('Unable to crawl')

  return response.json()
}

const DashboardPage = () => {
  const { data: lastCrawlTime, isLoading, isFetching } = useQuery<{ data: { lastCrawledAt: string } }>({
    queryKey: ['lastCrawl'],
    queryFn: fetchLastCrawl,
    retry: false,
    refetchOnWindowFocus: false
  });

  const queryClient = useQueryClient()

  const { mutate: crawl, isPending } = useMutation({
    mutationFn: triggerCrawl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lastCrawl'] })
    },
  });

  return (
    <>
      <SiteHeader title="Dashboard" />

      <div className="flex flex-1 flex-col p-4">
        <Card>
          <CardHeader>
            <CardTitle>Crawler Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last crawled:</p>
                {isLoading || isFetching ?
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  :
                  <p className="text-2xl font-bold">
                    {lastCrawlTime?.data.lastCrawledAt
                      ? format(new Date(lastCrawlTime?.data.lastCrawledAt), 'PPpp')
                      : 'Never'}
                  </p>
                }
              </div>

              <Button
                onClick={() => crawl()}
                disabled={isPending || isLoading || isFetching}
              >
                {(isPending || isLoading || isFetching) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crawl Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default DashboardPage