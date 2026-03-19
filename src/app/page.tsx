import Hero from '@/components/sections/Hero'
import FeatureCards from '@/components/sections/FeatureCards'
import GalleryPreview from '@/components/sections/GalleryPreview'
import Testimonials from '@/components/sections/Testimonials'
import AdmissionsCTA from '@/components/sections/AdmissionsCTA'
export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <GalleryPreview />
      <Testimonials />
      <AdmissionsCTA />
    </main>
  )
}