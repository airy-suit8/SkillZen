import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Brain,
  Code,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  Award,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Aptitude Practice",
      description: "Comprehensive practice tests for Quantitative, Logical Reasoning, and Verbal Ability",
      benefits: ["1000+ practice questions", "Detailed explanations", "Timed mock tests", "Performance analytics"],
      color: "blue",
    },
    {
      icon: Code,
      title: "Coding Challenges",
      description: "Role-specific coding problems including DSA, SQL queries, and API challenges",
      benefits: [
        "500+ coding problems",
        "Multiple programming languages",
        "Real-time code execution",
        "Solution explanations",
      ],
      color: "green",
    },
    {
      icon: MessageSquare,
      title: "Interview Preparation",
      description: "Technical and HR interview questions with AI-powered feedback",
      benefits: [
        "300+ interview questions",
        "Video practice sessions",
        "AI feedback system",
        "Industry-specific questions",
      ],
      color: "purple",
    },
    {
      icon: FileText,
      title: "Resume Analysis",
      description: "AI-powered resume parsing with improvement suggestions",
      benefits: ["ATS compatibility check", "Skill extraction", "Format optimization", "Industry benchmarking"],
      color: "orange",
    },
    {
      icon: Award,
      title: "Company Papers",
      description: "Previous year question papers from top companies",
      benefits: ["50+ company papers", "Recent year questions", "Difficulty-wise sorting", "Success rate tracking"],
      color: "red",
    },
    {
      icon: TrendingUp,
      title: "Salary Insights",
      description: "Predict expected salary based on skills, location, and experience",
      benefits: [
        "Market rate analysis",
        "Location-based insights",
        "Skill premium calculation",
        "Career growth tracking",
      ],
      color: "teal",
    },
    {
      icon: Users,
      title: "Mock Tests",
      description: "Comprehensive mock tests with real-time scoring and detailed feedback",
      benefits: [
        "Company-specific tests",
        "Time management practice",
        "Detailed performance reports",
        "Peer comparison",
      ],
      color: "indigo",
    },
    {
      icon: Brain,
      title: "Personalized Learning",
      description: "Custom learning paths based on your role, skills, and career goals",
      benefits: [
        "Adaptive learning algorithm",
        "Progress tracking",
        "Weakness identification",
        "Goal-oriented roadmap",
      ],
      color: "pink",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              SkillZen
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">🚀 Comprehensive Features</Badge>
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Everything You Need for Career Success
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive suite of tools and features designed to accelerate your career preparation and
            help you land your dream job.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful candidates who have used SkillZen to achieve their career goals.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Start Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
