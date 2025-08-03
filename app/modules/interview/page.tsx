"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MessageSquare, Mic, MicOff, RotateCcw, Star } from "lucide-react"

interface InterviewQuestion {
  id: number
  category: "Technical" | "HR" | "Behavioral"
  role: string
  question: string
  difficulty: "Easy" | "Medium" | "Hard"
  sampleAnswer: string
  tips: string[]
  followUp?: string[]
}

const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: "Technical",
    role: "Web Developer",
    question: "Explain the difference between let, const, and var in JavaScript.",
    difficulty: "Medium",
    sampleAnswer:
      "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned but not redeclared, const is block-scoped and cannot be reassigned or redeclared. const must be initialized at declaration.",
    tips: [
      "Mention hoisting behavior",
      "Explain scope differences",
      "Give practical examples",
      "Discuss temporal dead zone",
    ],
    followUp: ["What is hoisting?", "Can you modify a const object?", "What happens in the temporal dead zone?"],
  },
  {
    id: 2,
    category: "HR",
    role: "General",
    question: "Tell me about yourself.",
    difficulty: "Easy",
    sampleAnswer:
      "I'm a passionate web developer with 2 years of experience building responsive web applications. I specialize in React and Node.js, and I'm particularly interested in creating user-friendly interfaces that solve real-world problems.",
    tips: [
      "Keep it professional and relevant",
      "Highlight key achievements",
      "Connect to the role you're applying for",
      "Keep it under 2 minutes",
    ],
    followUp: ["What motivates you?", "Where do you see yourself in 5 years?", "Why are you interested in this role?"],
  },
  {
    id: 3,
    category: "Behavioral",
    role: "General",
    question: "Describe a time when you had to work with a difficult team member.",
    difficulty: "Hard",
    sampleAnswer:
      "In my previous project, I worked with a team member who was resistant to code reviews. I approached them privately to understand their concerns, explained the benefits of peer review, and suggested we start with smaller, less critical changes. This helped build trust and eventually they became one of our most thorough reviewers.",
    tips: [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Focus on your actions and learning",
      "Show emotional intelligence",
      "End with a positive outcome",
    ],
    followUp: [
      "How do you handle conflict in general?",
      "What did you learn from this experience?",
      "How would you prevent similar issues?",
    ],
  },
  {
    id: 4,
    category: "Technical",
    role: "Data Analyst",
    question: "How would you handle missing data in a dataset?",
    difficulty: "Medium",
    sampleAnswer:
      "I would first analyze the pattern of missing data to understand if it's random or systematic. Then choose appropriate strategies: deletion for small amounts of random missing data, imputation using mean/median/mode for numerical data, or advanced techniques like regression imputation for more complex cases.",
    tips: [
      "Mention different types of missing data",
      "Discuss various imputation methods",
      "Consider the impact on analysis",
      "Mention validation techniques",
    ],
    followUp: [
      "When would you use forward fill vs backward fill?",
      "How do you validate your imputation strategy?",
      "What are the risks of removing missing data?",
    ],
  },
]

export default function InterviewPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion>(interviewQuestions[0])
  const [userAnswer, setUserAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [feedback, setFeedback] = useState<{
    score: number
    strengths: string[]
    improvements: string[]
  } | null>(null)
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredQuestions = interviewQuestions.filter((q) => {
    const roleMatch = selectedRole === "All" || q.role === selectedRole || q.role === "General"
    const categoryMatch = selectedCategory === "All" || q.category === selectedCategory
    return roleMatch && categoryMatch
  })

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    // Start recording timer
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
      setIsRecording(false)
    }, 120000) // Auto stop after 2 minutes
  }

  const handleStopRecording = () => {
    setIsRecording(false)
  }

  const handleSubmitAnswer = () => {
    // Simulate AI feedback
    const mockFeedback = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      strengths: ["Clear communication", "Good structure using STAR method", "Relevant examples provided"],
      improvements: [
        "Could provide more specific metrics",
        "Consider mentioning lessons learned",
        "Add more technical details",
      ],
    }
    setFeedback(mockFeedback)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "Hard":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical":
        return "text-blue-600 bg-blue-100"
      case "HR":
        return "text-purple-600 bg-purple-100"
      case "Behavioral":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold text-purple-600">Interview Preparation</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Bank */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Bank</CardTitle>
                <CardDescription>Practice interview questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="space-y-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="All">All Roles</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="General">General</option>
                  </select>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="All">All Categories</option>
                    <option value="Technical">Technical</option>
                    <option value="HR">HR</option>
                    <option value="Behavioral">Behavioral</option>
                  </select>
                </div>

                {/* Question List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredQuestions.map((question) => (
                    <div
                      key={question.id}
                      onClick={() => setSelectedQuestion(question)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedQuestion.id === question.id ? "border-purple-500 bg-purple-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getCategoryColor(question.category)}>{question.category}</Badge>
                        <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                      </div>
                      <p className="font-medium text-sm line-clamp-2">{question.question}</p>
                      <p className="text-xs text-gray-500 mt-1">{question.role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="practice" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="tips">Tips & Sample</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="practice" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{selectedQuestion.question}</CardTitle>
                      <div className="flex space-x-2">
                        <Badge className={getCategoryColor(selectedQuestion.category)}>
                          {selectedQuestion.category}
                        </Badge>
                        <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                          {selectedQuestion.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>Role: {selectedQuestion.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Recording Controls */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={isRecording ? handleStopRecording : handleStartRecording}
                          variant={isRecording ? "destructive" : "default"}
                          size="sm"
                        >
                          {isRecording ? (
                            <>
                              <MicOff className="w-4 h-4 mr-2" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="w-4 h-4 mr-2" />
                              Start Recording
                            </>
                          )}
                        </Button>
                        {isRecording && (
                          <div className="flex items-center space-x-2 text-red-600">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="font-mono">{formatTime(recordingTime)}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Recommended time: 2-3 minutes</div>
                    </div>

                    {/* Text Answer */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Answer (Optional - for text practice)
                      </label>
                      <Textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="min-h-[200px]"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleSubmitAnswer}>Get Feedback</Button>
                      <Button variant="outline" onClick={() => setUserAnswer("")}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sample Answer & Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Sample Answer:</h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700">{selectedQuestion.sampleAnswer}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Key Tips:</h3>
                      <ul className="space-y-2">
                        {selectedQuestion.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedQuestion.followUp && (
                      <div>
                        <h3 className="font-semibold mb-2">Possible Follow-up Questions:</h3>
                        <div className="space-y-2">
                          {selectedQuestion.followUp.map((followUp, index) => (
                            <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                              <p className="text-gray-700">{followUp}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Feedback</CardTitle>
                    <CardDescription>Analysis of your interview response</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {feedback ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full text-white text-2xl font-bold mb-2">
                            {feedback.score}
                          </div>
                          <p className="text-lg font-semibold">Overall Score</p>
                          <div className="flex justify-center mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.floor(feedback.score / 20)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
                            <ul className="space-y-1">
                              {feedback.strengths.map((strength, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                  <span className="text-sm">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-semibold text-orange-600 mb-2">Areas for Improvement</h3>
                            <ul className="space-y-1">
                              {feedback.improvements.map((improvement, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                  <span className="text-sm">{improvement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Recommendation</h4>
                          <p className="text-sm text-gray-700">
                            Great job on structuring your answer! Focus on providing more specific examples and
                            quantifiable results to make your responses even stronger.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Submit an answer to receive AI-powered feedback</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
