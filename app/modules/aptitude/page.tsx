"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, Clock, ArrowLeft, ArrowRight, CheckCircle, RotateCcw, Target } from "lucide-react"

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const aptitudeQuestions: Question[] = [
  {
    id: 1,
    category: "Quantitative",
    question: "If a train travels 120 km in 2 hours, what is its speed in km/h?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: 1,
    explanation: "Speed = Distance / Time = 120 km / 2 hours = 60 km/h",
    difficulty: "Easy",
  },
  {
    id: 2,
    category: "Logical Reasoning",
    question: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    explanation: "The differences are 4, 6, 8, 10, so next difference is 12. 30 + 12 = 42",
    difficulty: "Medium",
  },
  {
    id: 3,
    category: "Verbal Ability",
    question: "Choose the synonym for 'Abundant':",
    options: ["Scarce", "Plentiful", "Limited", "Rare"],
    correctAnswer: 1,
    explanation: "Abundant means existing in large quantities; plentiful.",
    difficulty: "Easy",
  },
  {
    id: 4,
    category: "Quantitative",
    question: "What is 15% of 240?",
    options: ["32", "36", "40", "44"],
    correctAnswer: 1,
    explanation: "15% of 240 = (15/100) × 240 = 36",
    difficulty: "Easy",
  },
  {
    id: 5,
    category: "Logical Reasoning",
    question: "If all roses are flowers and some flowers are red, which conclusion is correct?",
    options: ["All roses are red", "Some roses are red", "No roses are red", "Cannot be determined"],
    correctAnswer: 3,
    explanation: "We cannot determine the color of roses from the given information.",
    difficulty: "Hard",
  },
]

export default function AptitudePage() {
  const [mode, setMode] = useState<"practice" | "test">("practice")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isTestActive, setIsTestActive] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isTestActive && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      handleSubmitTest()
    }
    return () => clearTimeout(timer)
  }, [isTestActive, timeLeft, showResults])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < aptitudeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    setShowResults(true)
    setIsTestActive(false)
  }

  const calculateScore = () => {
    let correct = 0
    aptitudeQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: aptitudeQuestions.length,
      percentage: Math.round((correct / aptitudeQuestions.length) * 100),
    }
  }

  const startTest = () => {
    setMode("test")
    setIsTestActive(true)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setTimeLeft(1800)
  }

  const resetTest = () => {
    setMode("practice")
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setIsTestActive(false)
    setTimeLeft(1800)
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Test Completed!</CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{score.correct}</p>
                  <p className="text-sm text-gray-600">Correct Answers</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{score.percentage}%</p>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{score.total}</p>
                  <p className="text-sm text-gray-600">Total Questions</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Detailed Results</h3>
                {aptitudeQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  return (
                    <div key={question.id} className="text-left p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={isCorrect ? "default" : "destructive"}>
                          {isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                        <Badge variant="outline">{question.category}</Badge>
                      </div>
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        Your answer: {userAnswer !== undefined ? question.options[userAnswer] : "Not answered"}
                      </p>
                      <p className="text-sm text-green-600 mb-2">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                      <p className="text-sm text-gray-500">{question.explanation}</p>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={resetTest} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Link href="/dashboard">
                  <Button>Back to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Aptitude Practice</span>
          </div>
        </div>

        {mode === "practice" && !isTestActive && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Practice Mode
                </CardTitle>
                <CardDescription>Practice questions with instant feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setMode("practice")} className="w-full">
                  Start Practice
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  Timed Test
                </CardTitle>
                <CardDescription>30-minute test with final results</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={startTest} className="w-full bg-transparent" variant="outline">
                  Start Test
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Test Interface */}
        {(mode === "practice" || isTestActive) && (
          <div className="space-y-6">
            {/* Progress and Timer */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {aptitudeQuestions.length}
                    </span>
                    <Progress value={((currentQuestion + 1) / aptitudeQuestions.length) * 100} className="w-32" />
                  </div>
                  {isTestActive && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{formatTime(timeLeft)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{aptitudeQuestions[currentQuestion].category}</Badge>
                  <Badge
                    variant={
                      aptitudeQuestions[currentQuestion].difficulty === "Easy"
                        ? "default"
                        : aptitudeQuestions[currentQuestion].difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {aptitudeQuestions[currentQuestion].difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{aptitudeQuestions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[aptitudeQuestions[currentQuestion].id]?.toString()}
                  onValueChange={(value) =>
                    handleAnswerSelect(aptitudeQuestions[currentQuestion].id, Number.parseInt(value))
                  }
                >
                  {aptitudeQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {mode === "practice" && selectedAnswers[aptitudeQuestions[currentQuestion].id] !== undefined && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800 mb-2">
                      {selectedAnswers[aptitudeQuestions[currentQuestion].id] ===
                      aptitudeQuestions[currentQuestion].correctAnswer
                        ? "✅ Correct!"
                        : "❌ Incorrect"}
                    </p>
                    <p className="text-sm text-blue-700">{aptitudeQuestions[currentQuestion].explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {currentQuestion === aptitudeQuestions.length - 1 ? (
                  <Button onClick={handleSubmitTest} className="bg-green-600 hover:bg-green-700">
                    Submit Test
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
