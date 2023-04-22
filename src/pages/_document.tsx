import MyNavbar from '@/components/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <MyNavbar />
        <div className='mx-4 my-4'>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
