import { siteLink, siteName } from '@/config'
import Script from 'next/script'
import Hero from '@/components/home/hero'
import RecentLyrics from '@/components/home/RecentLyrics'
import TopReciters from '@/components/home/TopReciters'
import CallToAction from '@/components/home/CallToAction'

export default function Home() {

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": siteName,
    "url": siteLink
  }



  return (
    <div className='space-y-10'>
      <Script
        id="home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <RecentLyrics />
      <TopReciters />
      <CallToAction />

    </div>
  )
}
