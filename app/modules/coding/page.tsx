"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Code, Play, CheckCircle, XCircle } from "lucide-react"

interface CodingProblem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: "DSA" | "SQL" | "API"
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  testCases: { input: string; expectedOutput: string }[]
  solution?: string
}

const codingProblems: CodingProblem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "DSA",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" },
    ],
    solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
  },
  {
    id: 2,
    title: "Employee Salary Query",
    difficulty: "Medium",
    category: "SQL",
    description:
      "Write a SQL query to find employees whose salary is greater than the average salary of their department.",
    examples: [
      {
        input: "Employee table with columns: id, name, salary, department_id",
        output: "List of employees with salary > department average",
      },
    ],
    constraints: ["Employee table has at least 1 row", "All salaries are positive integers"],
    testCases: [{ input: "Sample employee data", expectedOutput: "Filtered employee list" }],
    solution: `SELECT e1.id, e1.name, e1.salary, e1.department_id
FROM Employee e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM Employee e2
    WHERE e2.department_id = e1.department_id
);`,
  },
  {
    id: 3,
    title: "REST API Design",
    difficulty: "Hard",
    category: "API",
    description:
      "Design a RESTful API for a library management system with endpoints for books, authors, and borrowers.",
    examples: [
      {
        input: "API endpoints specification",
        output: "Complete API design with proper HTTP methods",
      },
    ],
    constraints: ["Follow REST conventions", "Include proper HTTP status codes", "Handle error cases"],
    testCases: [{ input: "API specification", expectedOutput: "Working endpoints" }],
    solution: `// Books endpoints
GET /api/books - Get all books
GET /api/books/:id - Get book by ID
POST /api/books - Create new book
PUT /api/books/:id - Update book
DELETE /api/books/:id - Delete book

// Authors endpoints
GET /api/authors - Get all authors
POST /api/authors - Create author

// Borrowers endpoints
GET /api/borrowers - Get all borrowers
POST /api/borrowers/:id/borrow/:bookId - Borrow book`,
  },
]

export default function CodingPage() {
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0])
  const [userCode, setUserCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [testResults, setTestResults] = useState<{ passed: number; total: number; results: boolean[] } | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleRunCode = async () => {
    setIsRunning(true)

    // Simulate code execution
    setTimeout(() => {
      const results = selectedProblem.testCases.map(() => Math.random() > 0.3)
      const passed = results.filter((r) => r).length

      setTestResults({
        passed,
        total: results.length,
        results,
      })
      setIsRunning(false)
    }, 2000)
  }

  const handleShowSolution = () => {
    if (selectedProblem.solution) {
      setUserCode(selectedProblem.solution)
    }
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
      case "DSA":
        return "text-blue-600 bg-blue-100"
      case "SQL":
        return "text-purple-600 bg-purple-100"
      case "API":
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
            <Code className="w-6 h-6 text-green-600" />
            <span className="text-xl font-bold text-green-600">Coding Practice</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Problem List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Problems</CardTitle>
                <CardDescription>Choose a problem to solve</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {codingProblems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProblem.id === problem.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(problem.category)}>{problem.category}</Badge>
                      <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                    </div>
                    <p className="font-medium text-sm">{problem.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="problem" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>

              <TabsContent value="problem" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{selectedProblem.title}</CardTitle>
                      <div className="flex space-x-2">
                        <Badge className={getCategoryColor(selectedProblem.category)}>{selectedProblem.category}</Badge>
                        <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                          {selectedProblem.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{selectedProblem.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Examples</h3>
                      {selectedProblem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                          <p>
                            <strong>Input:</strong> {example.input}
                          </p>
                          <p>
                            <strong>Output:</strong> {example.output}
                          </p>
                          {example.explanation && (
                            <p>
                              <strong>Explanation:</strong> {example.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Constraints</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {selectedProblem.constraints.map((constraint, index) => (
                          <li key={index}>{constraint}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Code Editor */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Code Editor</CardTitle>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="sql">SQL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="Write your code here..."
                      className="min-h-[300px] font-mono text-sm"
                    />

                    <div className="flex space-x-2">
                      <Button onClick={handleRunCode} disabled={isRunning}>
                        <Play className="w-4 h-4 mr-2" />
                        {isRunning ? "Running..." : "Run Code"}
                      </Button>
                      <Button onClick={handleShowSolution} variant="outline">
                        Show Solution
                      </Button>
                    </div>

                    {testResults && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`flex items-center space-x-2 ${testResults.passed === testResults.total ? "text-green-600" : "text-red-600"}`}
                          >
                            {testResults.passed === testResults.total ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <XCircle className="w-5 h-5" />
                            )}
                            <span className="font-medium">
                              {testResults.passed}/{testResults.total} test cases passed
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {selectedProblem.testCases.map((testCase, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${
                                testResults.results[index] ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Test Case {index + 1}</span>
                                {testResults.results[index] ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Input: {testCase.input}</p>
                              <p className="text-sm text-gray-600">Expected: {testCase.expectedOutput}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solution" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Solution Explanation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedProblem.solution ? (
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-sm overflow-x-auto">
                            <code>{selectedProblem.solution}</code>
                          </pre>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Time Complexity:</strong> O(n)
                          </p>
                          <p>
                            <strong>Space Complexity:</strong> O(n)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">Solution not available for this problem.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">Accepted</p>
                            <p className="text-sm text-gray-500">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Runtime: 68ms</p>
                          <p className="text-sm text-gray-600">Memory: 42.1MB</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <XCircle className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-medium">Wrong Answer</p>
                            <p className="text-sm text-gray-500">5 minutes ago</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Test case 2/3 failed</p>
                        </div>
                      </div>
                    </div>
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
