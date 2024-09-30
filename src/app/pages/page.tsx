"use client"

import { useState, useRef, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { Users, Link, Search, FileType, Home, Folder, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { QRCodeSVG } from 'qrcode.react'

const FileInput = ({ id, label, onChange }: {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center">
      <Label htmlFor={id} className="cursor-pointer">
        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#2A4B40] rounded-lg hover:bg-[#E8D5B5] transition-colors">
          <Folder className="w-8 h-8 text-[#2A4B40] mb-2" />
          <span className="text-sm text-[#2A4B40]">{label}</span>
        </div>
      </Label>
      <input
        type="file"
        id={id}
        ref={inputRef}
        onChange={onChange}
        className="hidden"
        webkitdirectory="true"
        directory="true"
      />
    </div>
  )
}

export default function Component() {
  const [rootDirectory, setRootDirectory] = useState<string | null>(null)
  const [outputDirectory, setOutputDirectory] = useState<string | null>(null)
  const [searchOption, setSearchOption] = useState<string>('keywords')
  const [convertFile, setConvertFile] = useState<string | null>(null)
  const [convertFormat, setConvertFormat] = useState<string>('xml')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [sshLink, setSSHLink] = useState<string>('')

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, setter: (value: string) => void) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files[0]) {
      setter(files[0].name)
    }
  }

  const generateSSHLink = () => {
    const randomString = Math.random().toString(36).substring(7)
    setSSHLink(`ssh://hashmonks-${randomString}.example.com`)
  }

  const handleCallbackRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the phone number to your backend
    console.log(`Callback requested for: ${phoneNumber}`)
    setPhoneNumber('')
    alert('Callback request submitted!')
  }

  const handleFileChange = (setter: Dispatch<SetStateAction<string | null>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(file.name);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3] text-[#2A4B40] font-mono">
      <nav className="bg-[#2A4B40] text-[#F5E6D3] p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#F5E6D3] rounded-full flex items-center justify-center">
            <span className="text-[#2A4B40] font-bold text-xl">#</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">HashMonks</span>
        </div>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-[#F5E6D3] text-[#F5E6D3] hover:bg-[#3A6B5A]" onClick={generateSSHLink}>
                <Users className="mr-2 h-4 w-4" /> Create Collaborative Server
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#F5E6D3] text-[#2A4B40]">
              <DialogHeader>
                <DialogTitle>Collaborative Server Created</DialogTitle>
                <DialogDescription>
                  Scan the QR code or use the SSH link to connect to the server.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-center">
                  <QRCodeSVG value={sshLink} size={200} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ssh-link">SSH Link</Label>
                  <Input id="ssh-link" value={sshLink} readOnly />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-[#F5E6D3] text-[#F5E6D3] hover:bg-[#3A6B5A]">
                <Link className="mr-2 h-4 w-4" /> Connect to Our Expert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#F5E6D3] text-[#2A4B40]">
              <DialogHeader>
                <DialogTitle>Connect to Our Expert</DialogTitle>
                <DialogDescription>
                  Choose how you&apos;d like to connect with our expert.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button className="w-full" onClick={() => window.location.href = 'mailto:hashmonks@gmail.com'}>
                  <Mail className="mr-2 h-4 w-4" /> Email Us
                </Button>
                <form onSubmit={handleCallbackRequest}>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Request a Callback</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full mt-2">
                    <Phone className="mr-2 h-4 w-4" /> Request Callback
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      
      <main className="container mx-auto mt-8 p-4">
        <p className="text-xl text-center mb-8 text-[#2A4B40]">
          Sync your entire folder by providing a root directory and get a machine-readable ready folder in the specified output directory.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="border-2 border-[#2A4B40] rounded-lg p-4 text-center">
            <h2 className="text-xl font-bold mb-4">Root Directory</h2>
            <FileInput
              id="root-directory"
              label="Select Root Directory"
              onChange={handleFileChange(setRootDirectory)}
            />
            {rootDirectory && (
              <p className="mt-2 text-[#D35400] text-sm">Selected: {rootDirectory}</p>
            )}
          </div>
          
          <div className="border-2 border-[#2A4B40] rounded-lg p-4 text-center">
            <h2 className="text-xl font-bold mb-4">Output Directory</h2>
            <FileInput
              id="output-directory"
              label="Select Output Directory"
              onChange={handleFileChange(setOutputDirectory)}
            />
            {outputDirectory && (
              <p className="mt-2 text-[#D35400] text-sm">Selected: {outputDirectory}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="flex-grow text-lg p-6 bg-[#F5E6D3] border-2 border-[#2A4B40] text-[#2A4B40] placeholder-[#5D8A7D]"
            />
            <Select value={searchOption} onValueChange={setSearchOption}>
              <SelectTrigger className="w-[200px] bg-[#F5E6D3] border-2 border-[#2A4B40] text-[#2A4B40]">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="keywords">Search through keywords</SelectItem>
                <SelectItem value="context">Search through context</SelectItem>
                <SelectItem value="filename">Search through filename</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-[#D35400] hover:bg-[#A04000] text-[#F5E6D3]">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#2A4B40]">File Conversion Tool</h2>
          <div className="flex items-center space-x-4">
            <div 
              className="flex-grow border-2 border-dashed border-[#2A4B40] rounded-lg p-4 text-center cursor-pointer hover:bg-[#E8D5B5] transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, setConvertFile)}
            >
              <FileType className="mx-auto h-8 w-8 text-[#2A4B40] mb-2" />
              <p className="text-sm mb-2">Drag and drop non-machine readable document here</p>
              {convertFile && (
                <p className="text-[#D35400] text-sm">Selected: {convertFile}</p>
              )}
            </div>
            <Select value={convertFormat} onValueChange={setConvertFormat}>
              <SelectTrigger className="w-[100px] bg-[#F5E6D3] border-2 border-[#2A4B40] text-[#2A4B40]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#D35400] hover:bg-[#A04000] text-[#F5E6D3]">
              Convert
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button className="bg-[#2A4B40] hover:bg-[#3A6B5A] text-[#F5E6D3]">
            <Home className="mr-2 h-4 w-4" /> Return to Homepage
          </Button>
        </div>
      </main>
    </div>
  )
}