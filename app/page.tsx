import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Code, FileText, MessageSquare, TrendingUp, Users, Award } from "lucide-react"

export default function LandingPage() {
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
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">🚀 Your Career Success Partner</Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Master Your Career Journey with SkillZen
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Personalized preparation platform for placement drives, technical interviews, and career success. Practice
            aptitude, coding, communication skills, and get salary insights.
          </p>
          <div className="flex justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8"
              >
                Start
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Everything You Need to Succeed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Aptitude Practice</CardTitle>
                <CardDescription>Quantitative, Logical Reasoning, and Verbal Ability tests</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Coding Challenges</CardTitle>
                <CardDescription>DSA problems, SQL queries, and API challenges by role</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Interview Prep</CardTitle>
                <CardDescription>Technical and HR questions with communication practice</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Resume Analysis</CardTitle>
                <CardDescription>AI-powered resume parsing and improvement suggestions</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-red-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle className="text-lg">Company Papers</CardTitle>
                <CardDescription>Previous year questions from TCS, Infosys, Wipro & more</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-teal-600 mb-2" />
                <CardTitle className="text-lg">Salary Insights</CardTitle>
                <CardDescription>Predict expected salary based on skills and location</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle className="text-lg">Mock Tests</CardTitle>
                <CardDescription>Timed tests with real-time scoring and feedback</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="w-8 h-8 text-pink-600 mb-2" />
                <CardTitle className="text-lg">Personalized Path</CardTitle>
                <CardDescription>Custom learning journey based on your role and skills</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who have successfully landed their dream jobs with SkillZen.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Start Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
