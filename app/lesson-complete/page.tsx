"use client"

import { useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Award, Star } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useUserProgress } from "@/hooks/use-user-progress"

function LessonCompleteContent() {
  const searchParams = useSearchParams()
  const lessonId = searchParams.get("lessonId")
  const lang = searchParams.get("lang")
  const { completeLesson } = useUserProgress()

  useEffect(() => {
    if (lang && lessonId) {
      completeLesson(lang, lessonId)
    }
  }, [lang, lessonId, completeLesson])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg animate-in fade-in zoom-in-95">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
            <Award className="h-10 w-10 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Lesson Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-gray-600">
            Congratulations, you've successfully completed the lesson.
          </p>
          
          <div className="flex justify-center space-x-8 text-center">
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold text-blue-500">+100</p>
              <p className="text-sm text-gray-500">XP Earned</p>
            </div>
            <div className="flex flex-col items-center">
               <p className="text-2xl font-bold text-blue-500">+1</p>
               <p className="text-sm text-gray-500">Day Streak</p>
            </div>
          </div>

          <Link href="/dashboard">
            <Button size="lg" className="w-full">
              Continue Learning
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LessonCompletePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LessonCompleteContent />
    </Suspense>
  )
} 