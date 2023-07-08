import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-slate-100 dark:bg-zinc-900 dark:text-brandLight">
        <div className="container mx-auto px-4">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
