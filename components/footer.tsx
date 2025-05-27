"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { userData } from "@/lib/data"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">{userData.name}</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Aspiring Full Stack Developer
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href={userData.github_url}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a
              href={userData.linkedin_url}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${userData.email}`}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-2 text-red-500" /> by {userData.name}
            </p>
            <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
