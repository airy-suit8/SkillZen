"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Brain,
  BookOpen,
  Code,
  MessageSquare,
  FileText,
  Award,
  TrendingUp,
  Users,
  Bell,
  Settings,
  LogOut,
  Upload,
  Target,
  Clock,
  Star,
} from "lucide-react"

export default function Dashboard() {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    role: "Web Developer",
    location: "Bangalore",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
  })

  const [stats] = useState({
    overallProgress: 68,
    testsCompleted: 12,
    skillsImproved: 8,
    resumeScore: 85,
  })

  const modules = [
    {
      id: "aptitude",
      title: "Aptitude Practice",
      description: "Quantitative, Logical & Verbal",
      icon: BookOpen,
      progress: 75,
      color: "blue",
      completed: 15,
      total: 20,
      route: "/modules/aptitude",
    },
    {
      id: "coding",
      title: "Coding Challenges",
      description: "DSA, SQL & API Problems",
      icon: Code,
      progress: 60,
      color: "green",
      completed: 12,
      total: 20,
      route: "/modules/coding",
    },
    {
      id: "interview",
      title: "Interview Prep",
      description: "Technical & HR Questions",
      icon: MessageSquare,
      progress: 45,
      color: "purple",
      completed: 9,
      total: 20,
      route: "/modules/interview",
    },
    {
      id: "resume",
      title: "Resume Analysis",
      description: "AI-powered insights",
      icon: FileText,
      progress: 85,
      color: "orange",
      completed: 1,
      total: 1,
      route: "/tools",
    },
    {
      id: "company",
      title: "Company Papers",
      description: "Previous year questions",
      icon: Award,
      progress: 30,
      color: "red",
      completed: 6,
      total: 20,
      route: "/modules/company-papers",
    },
    {
      id: "communication",
      title: "Communication",
      description: "Speaking & Writing practice",
      icon: Users,
      progress: 55,
      color: "teal",
      completed: 11,
      total: 20,
      route: "/tools",
    },
  ]

  const recentActivity = [
    { action: "Completed Quantitative Aptitude Test", time: "2 hours ago", score: "85%" },
    { action: "Uploaded Resume for Analysis", time: "1 day ago", score: "Analyzed" },
    { action: "Practiced DSA Problems", time: "2 days ago", score: "12/15" },
    { action: "Mock Interview Session", time: "3 days ago", score: "Good" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              SkillZen
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600">Continue your journey to become a successful {user.role}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.overallProgress}%</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <Progress value={stats.overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tests Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.testsCompleted}</p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Skills Improved</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.skillsImproved}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resume Score</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.resumeScore}%</p>
                </div>
                <Star className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Modules</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module) => {
                const IconComponent = module.icon
                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <IconComponent className={`w-8 h-8 text-${module.color}-600`} />
                        <Badge variant="secondary">
                          {module.completed}/{module.total}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} />
                      </div>
                      <Link href={module.route}>
                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                          Continue Learning
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/tools">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Resume
                  </Button>
                </Link>
                <Link href="/modules/aptitude">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Take Mock Test
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Salary Insights
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          <Badge variant="secondary" className="text-xs">
                            {activity.score}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Salary Prediction */}
            <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Salary Prediction</CardTitle>
                <CardDescription className="text-blue-100">Based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">₹8.5L - ₹12L</p>
                  <p className="text-sm text-blue-100 mt-1">Expected Annual Package</p>
                  <Link href="/tools">
                    <Button className="w-full mt-4 bg-white text-blue-600 hover:bg-gray-100">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
