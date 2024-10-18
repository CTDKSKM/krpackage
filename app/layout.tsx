import { Noto_Sans_KR } from 'next/font/google'
import '@/app/globals.css'

const notoSansKR = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en" className={notoSansKR.className}>
      <body>
          {children}
      </body>
    </html>
  )
}

export default RootLayout;
