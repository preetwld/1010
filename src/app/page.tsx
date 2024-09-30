"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Carousel } from "@/components/ui/carousel"
import { Search, FileText, Database, FileSearch } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'  // Add this import

const ads = [
  {
    title: "AI-Powered Document Conversion",
    description: "Transform non-readable files into machine-readable formats effortlessly.",
    cta: "Get Started"
  },
  {
    title: "Smart Automation Solutions",
    description: "Streamline your document management with our AI ecosystem.",
    cta: "Learn More"
  },
  {
    title: "Enhance Data Accessibility",
    description: "Convert documents to XML, JSON, CSV, and more with ease.",
    cta: "Try Now"
  }
]

const achievements = [
  { icon: <Search className="w-6 h-6" />, text: "AI-based keyword searchability in any directory", tech: "NLP & Information Retrieval" },
  { icon: <FileText className="w-6 h-6" />, text: "AI data extraction", tech: "Machine Learning & OCR" },
  { icon: <Database className="w-6 h-6" />, text: "Search through context", tech: "Semantic Analysis & Vector DBs" },
  { icon: <FileSearch className="w-6 h-6" />, text: "Data summarization", tech: "Transformer Models & NLG" }
]

export default function Component() {
  const [currentAd, setCurrentAd] = useState(0)
  const [formType, setFormType] = useState("")
  const router = useRouter()  // Add this line

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length)
    }, 5000) // Changed from 10000 to 5000
    return () => clearInterval(timer)
  }, [])

  const handleGetStarted = () => {
    router.push('/pages')  // This will redirect to the page.tsx in the pages directory
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3] text-[#2A4B40]">
      <nav className="flex items-center justify-between p-4 border-b border-[#2A4B40]">
        <div className="flex items-center space-x-4">
          <img src="/placeholder.svg" alt="TransformDoco Logo" className="w-10 h-10" />
          <span className="font-bold">TransformDoco</span>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-[#2A4B40] hover:text-[#D35400] hover:bg-[#F5E6D3]">Home</Button>
          <Button variant="ghost" className="text-[#2A4B40] hover:text-[#D35400] hover:bg-[#F5E6D3]">Research</Button>
          <Button variant="ghost" className="text-[#2A4B40] hover:text-[#D35400] hover:bg-[#F5E6D3]">Careers</Button>
          <Button variant="ghost" className="text-[#2A4B40] hover:text-[#D35400] hover:bg-[#F5E6D3]">About Us</Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-[#2A4B40] text-[#2A4B40] hover:bg-[#2A4B40] hover:text-[#F5E6D3]">Login</Button>
          <Button className="bg-[#D35400] text-[#F5E6D3] hover:bg-[#A04000]">Sign Up</Button>
        </div>
      </nav>

      <Carousel className="w-full max-w-4xl mx-auto mt-8">
        {ads.map((ad, index) => (
          <div
            key={index}
            className={`${
              index === currentAd ? 'block' : 'hidden'
            } text-center p-8 bg-[#2A4B40]/5 rounded-lg`}
          >
            <h2 className="text-2xl font-bold mb-4 text-[#2A4B40]">{ad.title}</h2>
            <p className="mb-6 text-[#2A4B40]">{ad.description}</p>
            <Button 
              className="bg-[#D35400] text-[#F5E6D3] hover:bg-[#A04000]"
              onClick={handleGetStarted}  // Add this onClick handler
            >
              {ad.cta}
            </Button>
          </div>
        ))}
      </Carousel>

      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#2A4B40]">Our Technological Achievements</h2>
        <div className="grid grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-4 p-6 bg-[#2A4B40]/5 rounded-lg border border-[#2A4B40]/10 hover:border-[#2A4B40]/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="text-[#D35400]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {achievement.icon}
              </motion.div>
              <span className="font-semibold text-center text-[#2A4B40]">{achievement.text}</span>
              <span className="text-sm text-[#2A4B40]/70 text-center">{achievement.tech}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-xl mx-auto mt-16 p-8 bg-[#F5E6D3] rounded-lg shadow-lg border border-[#2A4B40]/20">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#2A4B40]">User Feedback</h2>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2A4B40]">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" required className="border-[#2A4B40] text-[#2A4B40] placeholder-[#2A4B40]/50 focus:ring-[#D35400]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#2A4B40]">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1234567890" required className="border-[#2A4B40] text-[#2A4B40] placeholder-[#2A4B40]/50 focus:ring-[#D35400]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requestType" className="text-[#2A4B40]">Request Type</Label>
            <Select onValueChange={setFormType} value={formType}>
              <SelectTrigger id="requestType" className="border-[#2A4B40] text-[#2A4B40] focus:ring-[#D35400]">
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="callback">Request a Call Back</SelectItem>
                <SelectItem value="query">User Query</SelectItem>
                <SelectItem value="bug">Report Bug</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file" className="text-[#2A4B40]">Attach File (optional)</Label>
            <Input
              id="file"
              type="file"
              className="border-[#2A4B40] text-[#2A4B40] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D35400] file:text-[#F5E6D3] hover:file:bg-[#A04000]"
            />
          </div>
          <Button type="submit" className="w-full bg-[#D35400] text-[#F5E6D3] hover:bg-[#A04000]">Submit</Button>
        </form>
      </section>
    </div>
  )
}