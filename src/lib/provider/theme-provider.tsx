"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useState } from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

  const [queryClient]= useState(()=>new QueryClient())
  return (
  <QueryClientProvider client={queryClient} >
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
</QueryClientProvider>

)}