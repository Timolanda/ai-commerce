"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { luma } from "@ai-sdk/luma"
import { experimental_generateImage as generateImage } from "ai"
import { HexColorPicker } from "react-colorful"

export default function TryOn() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")

  const [userImage, setUserImage] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [outfit, setOutfit] = useState("")
  const [styleInfluence, setStyleInfluence] = useState(0.8)
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    if (productId) {
      // In a real app, you'd fetch the product details from an API
      setOutfit(`Product ${productId}`)
    }
  }, [productId])

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setUserImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const generateOutfit = async () => {
    setLoading(true)
    try {
      const { image } = await generateImage({
        model: luma.image("photon-1"),
        prompt: `A person wearing ${outfit} in ${color} color, photorealistic, high quality`,
        aspectRatio: "1:1",
        providerOptions: {
          luma: {
            image_ref: [
              {
                url: userImage,
                weight: styleInfluence,
              },
            ],
          },
        },
      })
      setGeneratedImage(URL.createObjectURL(new Blob([image.uint8Array], { type: "image/png" })))
    } catch (error) {
      console.error("Failed to generate image:", error)
      alert("Failed to generate image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Virtual Try-On</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upload Your Photo</h2>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {userImage && (
            <Image
              src={userImage || "/placeholder.svg"}
              alt="User uploaded image"
              width={300}
              height={300}
              className="mt-4 rounded-lg"
            />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Customize Outfit</h2>
          <Input
            type="text"
            value={outfit}
            onChange={(e) => setOutfit(e.target.value)}
            placeholder="Describe the outfit"
            className="mb-4"
          />
          <label className="block mb-2">Style Influence</label>
          <Slider
            value={[styleInfluence]}
            onValueChange={(value) => setStyleInfluence(value[0])}
            max={1}
            step={0.1}
            className="mb-4"
          />
          <label className="block mb-2">Color</label>
          <HexColorPicker color={color} onChange={setColor} className="mb-4" />
          <Button onClick={generateOutfit} disabled={!userImage || loading} className="w-full">
            {loading ? "Generating..." : "Generate Outfit"}
          </Button>
        </div>
      </div>
      {generatedImage && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Outfit</h2>
          <Image
            src={generatedImage || "/placeholder.svg"}
            alt="Generated outfit"
            width={512}
            height={512}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  )
}

