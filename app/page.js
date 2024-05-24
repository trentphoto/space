"use client"

import Image from "next/image"
import Link from "next/link"
import {
  MoreHorizontal,
  Sparkle,
  Sparkles,
  Youtube,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import generateExplanation from "@/lib/generateExplanation"
import getLaunches from "@/lib/getLaunches"

export default function Dashboard() {

  // state variable to hold api data
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(0)
    // 0: all
    // 1: success
    // 2: failure
  const [explanations, setExplanations] = useState({});
  const [explanationLoading, setExplanationLoading] = useState(false);

  const handleGenerateExplanation = async (item) => {
    setExplanationLoading(true);
    const explanation = await generateExplanation(item);
    setExplanations({ ...explanations, [item.id]: explanation });
    setExplanationLoading(false);
  }

  // effect to update filters
  useEffect(() => {
    let x = []
    if (filter === 0) x = data
    if (filter === 1) x = data.filter((item) => item.success)
    if (filter === 2) x = data.filter((item) => !item.success)
    setFilteredData(x)
    console.log(filteredData);
  }, [filter])
  
  // effect to fetch data
  useEffect(() => {
    async function fx() {
      const launches = await getLaunches();
      setData(launches)
      setFilteredData(launches)
      setLoading(false)
    }
    fx()
  }, [])

  return (
    <div className="">

      <div className="my-8">
        <h1 className="font-bold text-2xl">SpaceX Launches Dashboard</h1>
        <p>A quick demo application by James Trent.</p>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value)} className="my-4">
        <div className="flex items-center gap-4">
          <p>Filter launches:</p>
          <TabsList>
            <TabsTrigger value={0}>All</TabsTrigger>
            <TabsTrigger value={1}>Success</TabsTrigger>
            <TabsTrigger value={2}>Failure</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2"></div>
        </div>
      </Tabs>

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Launches</CardTitle>
          <CardDescription>
            Showing all SpaceX launches from 2006 - 2022.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">AI Explanation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Watch</TableHead>
                <TableHead className="hidden md:table-cell">Launch Date</TableHead>
                <TableHead> <span className="sr-only">Actions</span> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
              {
                loading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-semibold">Loading...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="hidden sm:table-cell">
                      {
                        item.links.patch.small === null ? (
                          <div className="flex items-center justify-center h-8 w-8 bg-gray-300 text-primary-foreground rounded-full"/>
                        ) : (
                          <Image
                            alt="image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={item.links.patch.small}
                            width="64"
                          />
                        )
                      }
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-xl">
                        {item.name}
                      </p>
                      <p className="opacity-50">
                        {item.details || "No details available"}
                      </p>
                    </TableCell>
                    
                    <TableCell className="hidden md:table-cell">

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="purple" onClick={() => handleGenerateExplanation(item)}>
                            <Sparkles className="h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>More Details (AI Generated)</DialogTitle>
                            <DialogDescription>
                              {
                                explanationLoading ? (
                                  <>
                                    <Sparkle className="h-5 w-5 animate-spin" />
                                    <span className="text-lg font-semibold">Generating...</span>
                                  </>
                                ) : explanations[item.id] || "No explanation available"
                              }
                            </DialogDescription>
                            <DialogFooter>
                              <p className="text-sm mt-8 opacity-50">Powered by OpenAI's GPT-3.5 Turbo</p>
                            </DialogFooter>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableCell>

                    <TableCell>
                      <Badge variant={item.success ? "green" : "destructive"}>
                        {item.success ? "Success" : "Failure"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      
                    {
                      item.links.webcast && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link 
                                target="_blank"
                                href={item.links.webcast ?? "#"}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                              >
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">Watch</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Watch</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    }

                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(item.date_utc).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {item.links.webcast && (
                            <DropdownMenuItem >
                              <Link href={item.links.webcast}>Watch Webcast</Link>
                            </DropdownMenuItem>
                          )}
                          {item.links.article && (
                            <DropdownMenuItem >
                              <Link href={item.links.article}>Read Article</Link>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              }

            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
            products
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}
