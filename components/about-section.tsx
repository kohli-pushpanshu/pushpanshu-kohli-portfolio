"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { userData } from "@/lib/data"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get to know more about my background, skills, and passion for development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{userData.name}</h3>
              <p className="text-xl text-blue-600 mb-4">{userData.title}</p>
              <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>{userData.email}</span>
                  </div>
                  {userData.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>{userData.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{userData.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {userData.resume_url && (
              <Button className="w-full lg:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative w-80 h-80 mx-auto lg:mx-0 mb-8">
              <Image
                src={userData.profile_image_url || "/placeholder.svg"}
                alt={userData.name}
                width={320}
                height={320}
                className="rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/10 to-purple-600/10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
