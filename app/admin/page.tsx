"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Trash2, MessageSquare, Briefcase, Code, FolderOpen, ImageIcon } from "lucide-react"
import type { ContactMessage, Project, Skill, Experience } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { PhotoUpload } from "@/components/photo-upload"
import { supabase } from "@/lib/supabase"
import { createClient } from '@supabase/supabase-js'




export default async function AdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [messagesRes, projectsRes, skillsRes, experiencesRes, userRes] = await Promise.all([
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("skills").select("*").order("name"),
        supabase.from("experiences").select("*").order("start_date", { ascending: false }),
        supabase.from("user_profile").select("*").single(),
      ])

      setMessages(messagesRes.data || [])
      setProjects(projectsRes.data || [])
      setSkills(skillsRes.data || [])
      setExperiences(experiencesRes.data || [])
      setUserProfile(userRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMessageRead = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("contact_messages").update({ read: !currentStatus }).eq("id", id)

      if (error) throw error

      setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, read: !currentStatus } : msg)))

      toast({
        title: "Success",
        description: `Message marked as ${!currentStatus ? "read" : "unread"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      })
    }
  }

  const deleteMessage = async (id: number) => {
    try {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id)

      if (error) throw error

      setMessages((prev) => prev.filter((msg) => msg.id !== id))

      toast({
        title: "Success",
        description: "Message deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    }
  }

  const toggleProjectFeatured = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("projects").update({ featured: !currentStatus }).eq("id", id)

      if (error) throw error

      setProjects((prev) =>
        prev.map((project) => (project.id === id ? { ...project, featured: !currentStatus } : project)),
      )

      toast({
        title: "Success",
        description: `Project ${!currentStatus ? "featured" : "unfeatured"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project status",
        variant: "destructive",
      })
    }
  }

  const updateProfilePhoto = async (imageUrl: string) => {
    try {
      const { error } = await supabase
        .from("user_profile")
        .update({ profile_image_url: imageUrl })
        .eq("id", userProfile.id)

      if (error) throw error

      setUserProfile((prev: any) => ({ ...prev, profile_image_url: imageUrl }))

      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile photo",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading admin panel...</div>
      </div>
    )
  }

  const unreadMessages = messages.filter((msg) => !msg.read).length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your portfolio content and messages</p>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Messages
            {unreadMessages > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {unreadMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Experience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PhotoUpload
              currentImageUrl={userProfile?.profile_image_url}
              onImageUpload={updateProfilePhoto}
              title="Profile Photo"
              description="Upload your profile photo that will appear in the hero and about sections"
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Images</h3>
              <p className="text-sm text-gray-600">
                You can update project images by editing each project individually. Click on any project below to update
                its image.
              </p>
              <div className="grid gap-2">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{project.title}</span>
                    <Button variant="outline" size="sm">
                      Update Image
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <div className="grid gap-4">
            {messages.map((message) => (
              <Card key={message.id} className={message.read ? "opacity-75" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {message.name}
                        {!message.read && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {message.email} • {formatDate(message.created_at)}
                      </CardDescription>
                      {message.subject && <p className="font-medium mt-1">{message.subject}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleMessageRead(message.id, message.read)}>
                        {message.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteMessage(message.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {project.title}
                        {project.featured && <Badge className="bg-blue-600">Featured</Badge>}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleProjectFeatured(project.id, project.featured)}
                    >
                      {project.featured ? "Unfeature" : "Feature"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {skill.name}
                    <Badge variant="outline" className="capitalize">
                      {skill.category}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>Proficiency</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <div className="grid gap-4">
            {experiences.map((experience) => (
              <Card key={experience.id}>
                <CardHeader>
                  <CardTitle>{experience.position}</CardTitle>
                  <CardDescription>
                    {experience.company} • {experience.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatDate(experience.start_date)} -{" "}
                    {experience.end_date ? formatDate(experience.end_date) : "Present"}
                  </p>
                  <p>{experience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

