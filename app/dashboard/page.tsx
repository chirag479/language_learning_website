"use client"

import { useState, useEffect } from "react"
import {
  BookOpen,
  PlayCircle,
  TrendingUp,
  Award,
  BarChart2,
  List,
  ChevronRight,
  Flame,
  Zap,
  Star,
  User as UserIcon,
  Settings,
  LogOut,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { lessons as allLessons } from "@/lib/lessons"
import { useUserProgress } from "@/hooks/use-user-progress"
import Image from "next/image"

const languages = [
  { code: "english", name: "English" },
  { code: "spanish", name: "Spanish" },
  { code: "hindi", name: "Hindi" },
]

const achievements = [
  { title: "Lesson I", icon: Star, unlocked: true },
  { title: "Quick Learner", icon: Zap, unlocked: true },
  { title: "5-Day Streak", icon: Flame, unlocked: true },
]

export default function DashboardPage() {
  const [language, setLanguage] = useState("english")
  const [userName, setUserName] = useState("User")
  const { progress } = useUserProgress()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUserName(userData.name || "User")
    }
  }, [])
  
  const lessons = allLessons[language] || []
  const currentLessonTitle = lessons.find(l => l.id === "1")?.title || "Basics of Greetings"

  const completedLessonsCount = (progress.completedLessons[language] || []).length
  const wordsLearned = completedLessonsCount * 5 // Approximation

  const stats = [
    { title: "Words Learned", value: wordsLearned, icon: BookOpen, color: "text-blue-500" },
    { title: "Lessons Completed", value: completedLessonsCount, icon: Award, color: "text-blue-500" },
    { title: "Weekly Goal", value: `${completedLessonsCount}/5`, icon: TrendingUp, color: "text-blue-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Image src="/langsphere-logo.png" alt="LangSphere Logo" width={32} height={32} />
            <h1 className="text-2xl font-bold text-black">LangSphere</h1>
            <div className="ml-6 flex items-center space-x-2 rounded-lg bg-gray-100 p-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "ghost"}
                  size="sm"
                  className="px-3"
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">{progress.streak} Day Streak</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">{progress.points} XP</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black">Welcome back, {userName}!</h2>
          <p className="text-gray-600">Continue your {languages.find(l => l.code === language)?.name} learning journey.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Continue Learning */}
            <Card className="mb-8 border-blue-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Continue Learning</span>
                  <Badge variant="secondary">Lesson 1</Badge>
                </CardTitle>
                <CardDescription>{currentLessonTitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={0} className="mb-4" />
                <p className="text-sm text-gray-600 mb-4">Start your next lesson!</p>
                <Link href={`/lesson/1?lang=${language}`}>
                  <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Jump Back In
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Your Lessons */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-black">Your Lessons</h3>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <Link href={`/lesson/${lesson.id}?lang=${language}`} key={index}>
                    <Card className="hover:border-blue-300 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${progress.completedLessons[language]?.includes(lesson.id) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                            {progress.completedLessons[language]?.includes(lesson.id) ? <CheckCircle className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
                          </div>
                          <div>
                            <h4 className="font-semibold">{lesson.title}</h4>
                            <p className="text-sm text-gray-500">5-10 min</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Stats */}
            <Card className="mb-8 shadow-sm">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.map((stat) => (
                    <div key={stat.title} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <stat.icon className={`h-6 w-6 mr-3 ${stat.color}`} />
                        <span className="font-medium">{stat.title}</span>
                      </div>
                      <span className="font-bold text-lg">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.title} className="flex flex-col items-center space-y-1">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        <achievement.icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs text-center">{achievement.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
