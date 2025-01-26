import { Rubik } from 'next/font/google'
import './globals.css'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog-App',
  description: 'أنشئ وحرر مدوناتك بسهولة مع تطبيق Blogger! استمتع بواجهة مستخدم بسيطة وسريعة لتحرير المحتوى، تحميل الصور، وجدولة المنشورات. شارك أفكارك وأعمالك مع العالم، وابقَ على اطلاع بعدد الزيارات والتعليقات في أي وقت وأينما كنت',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
