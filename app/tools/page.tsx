"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, FileText, DollarSign, MessageSquare, Zap, Download, Star, TrendingUp } from "lucide-react"

export default function ToolsPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeAnalysis, setResumeAnalysis] = useState<{
    score: number
    strengths: string[]
    improvements: string[]
    skills: string[]
    experience: string
    education: string
  } | null>(null)

  const [salaryData, setSalaryData] = useState({
    role: "",
    location: "",
    experience: "",
    skills: "",
  })

  const [salaryPrediction, setSalaryPrediction] = useState<{
    min: number
    max: number
    average: number
    factors: string[]
  } | null>(null)

  const [communicationInput, setCommunicationInput] = useState("")
  const [communicationFeedback, setCommunicationFeedback] = useState<{
    grammar: number
    fluency: number
    vocabulary: number
    suggestions: string[]
  } | null>(null)

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeFile(file)
      // Simulate resume analysis
      setTimeout(() => {
        setResumeAnalysis({
          score: 78,
          strengths: [
            "Strong technical skills in React and Node.js",
            "Good project experience with real-world applications",
            "Clear education background",
            "Relevant internship experience",
          ],
          improvements: [
            "Add more quantifiable achievements",
            "Include soft skills section",
            "Add certifications if any",
            "Improve formatting and consistency",
          ],
          skills: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "HTML/CSS"],
          experience: "2 years",
          education: "B.Tech Computer Science",
        })
      }, 2000)
    }
  }

  const handleSalaryPrediction = () => {
    // Simulate salary prediction
    setTimeout(() => {
      setSalaryPrediction({
        min: 450000,
        max: 850000,
        average: 650000,
        factors: [
          "Location: Bangalore (+15%)",
          "Experience: 2 years",
          "Skills: React, Node.js (+10%)",
          "Market demand: High",
        ],
      })
    }, 1500)
  }

  const handleCommunicationCheck = () => {
    // Simulate communication analysis
    setTimeout(() => {
      setCommunicationFeedback({
        grammar: 85,
        fluency: 78,
        vocabulary: 82,
        suggestions: [
          "Use more varied sentence structures",
          "Consider using stronger action verbs",
          "Practice pronunciation of technical terms",
          "Work on transition phrases between ideas",
        ],
      })
    }, 1000)
  }

  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${amount.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-yellow-600" />
            <span className="text-xl font-bold text-yellow-600">Career Tools</span>
          </div>
        </div>

        <Tabs defaultValue="resume" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resume" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Resume Parser</span>
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Salary Predictor</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Communication Trainer</span>
            </TabsTrigger>
          </TabsList>

          {/* Resume Parser */}
          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Resume Parser & Analyzer
                </CardTitle>
                <CardDescription>
                  Upload your resume to get AI-powered analysis and improvement suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Upload your resume</p>
                  <p className="text-sm text-gray-500 mb-4">Supports PDF, DOC, DOCX (Max 5MB)</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload">
                    <Button variant="outline" className="cursor-pointer bg-transparent">
                      Choose File
                    </Button>
                  </label>
                  {resumeFile && (
                    <p className="text-sm text-green-600 mt-2">✓ {resumeFile.name} uploaded successfully</p>
                  )}
                </div>

                {resumeAnalysis && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full text-white text-2xl font-bold mb-2">
                        {resumeAnalysis.score}
                      </div>
                      <p className="text-lg font-semibold">Resume Score</p>
                      <Progress value={resumeAnalysis.score} className="w-48 mx-auto mt-2" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {resumeAnalysis.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                <span className="text-sm">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-orange-600">Areas for Improvement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {resumeAnalysis.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                                <span className="text-sm">{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Extracted Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {resumeAnalysis.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold">{resumeAnalysis.experience}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Education</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{resumeAnalysis.education}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex space-x-4">
                      <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline">Get Resume Templates</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salary Predictor */}
          <TabsContent value="salary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Salary Predictor
                </CardTitle>
                <CardDescription>
                  Get salary insights based on your profile, location, and market trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Role</label>
                    <Input
                      placeholder="e.g., Software Engineer"
                      value={salaryData.role}
                      onChange={(e) => setSalaryData((prev) => ({ ...prev, role: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      placeholder="e.g., Bangalore"
                      value={salaryData.location}
                      onChange={(e) => setSalaryData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience (years)</label>
                    <Input
                      placeholder="e.g., 2"
                      value={salaryData.experience}
                      onChange={(e) => setSalaryData((prev) => ({ ...prev, experience: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Key Skills</label>
                    <Input
                      placeholder="e.g., React, Node.js, Python"
                      value={salaryData.skills}
                      onChange={(e) => setSalaryData((prev) => ({ ...prev, skills: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={handleSalaryPrediction} className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict Salary
                </Button>

                {salaryPrediction && (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Salary Prediction</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-2xl font-bold text-green-600">{formatSalary(salaryPrediction.min)}</p>
                          <p className="text-sm text-gray-600">Minimum</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-blue-600">{formatSalary(salaryPrediction.average)}</p>
                          <p className="text-sm text-gray-600">Average</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">{formatSalary(salaryPrediction.max)}</p>
                          <p className="text-sm text-gray-600">Maximum</p>
                        </div>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Factors Affecting Your Salary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {salaryPrediction.factors.map((factor, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">💡 Tips to Increase Your Salary</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Learn in-demand skills like cloud computing or AI/ML</li>
                        <li>• Get relevant certifications in your field</li>
                        <li>• Build a strong portfolio with real projects</li>
                        <li>• Consider relocating to high-paying cities</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Trainer */}
          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                  Communication Trainer
                </CardTitle>
                <CardDescription>Practice your communication skills and get AI-powered feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Practice Text (Write about yourself or answer an interview question)
                  </label>
                  <Textarea
                    placeholder="Write your response here... For example: 'Tell me about yourself' or describe a challenging project you worked on."
                    value={communicationInput}
                    onChange={(e) => setCommunicationInput(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>

                <Button onClick={handleCommunicationCheck} disabled={!communicationInput.trim()}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Analyze Communication
                </Button>

                {communicationFeedback && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Grammar</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{communicationFeedback.grammar}%</div>
                            <Progress value={communicationFeedback.grammar} className="mt-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Fluency</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{communicationFeedback.fluency}%</div>
                            <Progress value={communicationFeedback.fluency} className="mt-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Vocabulary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {communicationFeedback.vocabulary}%
                            </div>
                            <Progress value={communicationFeedback.vocabulary} className="mt-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Improvement Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {communicationFeedback.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                              <span className="text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">🎯 Practice Exercises</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">For Grammar:</p>
                          <ul className="list-disc list-inside">
                            <li>Practice complex sentence structures</li>
                            <li>Review subject-verb agreement</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium">For Fluency:</p>
                          <ul className="list-disc list-inside">
                            <li>Read aloud daily for 10 minutes</li>
                            <li>Practice speaking without filler words</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
