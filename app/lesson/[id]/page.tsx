"use client"

import { useState, useMemo, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check, X, RotateCcw, Heart, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { lessons } from "@/lib/lessons"

interface LessonStep {
  id: number
  type: "writing" | "multiple-choice"
  question: string
  content?: string
  options?: string[]
  correctAnswer: string | number
  explanation?: string
  hint?: string
}

function LessonContent() {
  const params = useParams()
  const searchParams = useSearchParams()

  const lessonId = params.id as string
  const language = searchParams.get("lang") || "english"

  const lesson = useMemo(() => {
    const languageLessons = lessons[language]
    if (!languageLessons) return null
    return languageLessons.find((l) => l.id === lessonId)
  }, [lessonId, language])

  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [showHint, setShowHint] = useState(false)

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Lesson Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the lesson you're looking for.
        </p>
        <Link href="/">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    )
  }
  
  const lessonSteps = lesson.steps

  const currentLessonStep = lessonSteps[currentStep]
  const progress = ((currentStep + 1) / lessonSteps.length) * 100

  const handleAnswer = () => {
    let correct = false

    if (currentLessonStep.type === "multiple-choice") {
      correct = selectedOption === currentLessonStep.correctAnswer
    } else {
      correct = userAnswer.toLowerCase().trim() === String(currentLessonStep.correctAnswer).toLowerCase().trim()
    }

    setIsCorrect(correct)
    setShowResult(true)

    if (!correct) {
      setHearts(Math.max(0, hearts - 1))
    }
  }

  const nextStep = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      resetStep()
    } else {
      // Lesson completed
      window.location.href = `/lesson-complete?lessonId=${lessonId}&lang=${language}`
    }
  }

  const resetStep = () => {
    setUserAnswer("")
    setSelectedOption(null)
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex-1 max-w-md">
                <Progress value={progress} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  Step {currentStep + 1} of {lessonSteps.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart key={i} className={`h-5 w-5 ${i < hearts ? "text-red-500 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <Badge variant="secondary">Lesson {lessonId}</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="lesson-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="mb-2">
                {currentLessonStep.type.replace("-", " ").toUpperCase()}
              </Badge>
              {currentLessonStep.hint && (
                <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Hint
                </Button>
              )}
            </div>
            <CardTitle className="text-2xl">{currentLessonStep.question}</CardTitle>
            {currentLessonStep.content && (
              <CardDescription className="text-lg font-medium text-primary">
                {currentLessonStep.content}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {showHint && currentLessonStep.hint && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-blue-800 dark:text-blue-200">{currentLessonStep.hint}</p>
                </div>
              </div>
            )}

            {/* Multiple Choice */}
            {currentLessonStep.type === "multiple-choice" && (
              <div className="space-y-3">
                {currentLessonStep.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedOption === index ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-4"
                    onClick={() => setSelectedOption(index)}
                    disabled={showResult}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {/* Writing Exercise */}
            {currentLessonStep.type === "writing" && (
              <div className="space-y-4">
                <Input
                  placeholder="Type your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showResult}
                  className="text-center text-lg"
                />
              </div>
            )}

            {/* Result Display */}
            {showResult && (
              <div
                className={`p-6 rounded-lg border-2 ${
                  isCorrect
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  {isCorrect ? <Check className="h-6 w-6 text-green-600" /> : <X className="h-6 w-6 text-red-600" />}
                  <h3
                    className={`font-bold text-lg ${
                      isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {isCorrect ? "Correct!" : "Not quite right"}
                  </h3>
                </div>

                {!isCorrect && (
                  <p className="text-red-700 dark:text-red-300 mb-2">
                    <strong>Correct answer:</strong> {String(currentLessonStep.correctAnswer)}
                  </p>
                )}

                {currentLessonStep.explanation && (
                  <p className="text-gray-700 dark:text-gray-300">{currentLessonStep.explanation}</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              {!showResult ? (
                <>
                  <Button
                    onClick={handleAnswer}
                    disabled={
                      (currentLessonStep.type === "multiple-choice" && selectedOption === null) ||
                      (currentLessonStep.type !== "multiple-choice" && !userAnswer.trim())
                    }
                    className="flex-1"
                    size="lg"
                  >
                    Check Answer
                  </Button>
                  <Button variant="outline" onClick={() => setShowHint(!showHint)} size="lg">
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex space-x-3 w-full">
                  {!isCorrect && (
                    <Button variant="outline" onClick={resetStep} size="lg">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  )}
                  <Button onClick={nextStep} className="flex-1" size="lg">
                    {currentStep === lessonSteps.length - 1 ? "Complete Lesson" : "Continue"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LessonContent />
    </Suspense>
  )
}
