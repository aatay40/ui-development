// Alternative way:
// import type { PropsWithChildren } from 'react'
// type Props = PropsWithChildren<{}>

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function Layout({ children } : Props) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">TaskMaster</h1>
          <span className="text-xs text-slate-500">SDB Workshop</span>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-slate-500 text-center">
          © {new Date().getFullYear()} TaskMaster
        </div>
      </footer>
    </div>
  )
}