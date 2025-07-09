"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bookmark, ThumbsUp, ThumbsDown, Users, MessageCircle, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import type { Idea } from "@/types/idea"

interface IdeaDetailClientProps {
  idea: Idea;
}

export function IdeaDetailClient({ idea }: IdeaDetailClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(idea.likes)
  const [dislikes, setDislikes] = useState(idea.dislikes)
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleReaction = (type: "like" | "dislike") => {
    if (userReaction === type) {
      if (type === "like") {
        setLikes(likes - 1)
      } else {
        setDislikes(dislikes - 1)
      }
      setUserReaction(null)
    } else {
      if (userReaction === "like") {
        setLikes(likes - 1)
        setDislikes(dislikes + 1)
      } else if (userReaction === "dislike") {
        setDislikes(dislikes - 1)
        setLikes(likes + 1)
      } else {
        if (type === "like") {
          setLikes(likes + 1)
        } else {
          setDislikes(dislikes + 1)
        }
      }
      setUserReaction(type)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 뒤로가기 버튼 */}
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          아이디어 목록으로
        </Button>
      </Link>

      {/* 메인 콘텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 아이디어 상세 정보 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{idea.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(idea.date).toLocaleDateString("ko-KR")}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleBookmark}
                  className={isBookmarked ? "text-blue-600" : "text-gray-400"}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {/* 카테고리 */}
              <div className="flex items-center mb-4">
                <Tag className="h-4 w-4 mr-2 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {idea.category.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 원문 요약 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">원문 요약</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg italic">"{idea.summary}"</p>
              </div>

              {/* 번역된 설명 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">상세 설명</h3>
                <p className="text-gray-700 leading-relaxed">{idea.translated}</p>
              </div>

              {/* 반응 버튼 */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handleReaction("like")}
                  className={userReaction === "like" ? "border-green-500 text-green-600" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  좋아요 ({likes})
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleReaction("dislike")}
                  className={userReaction === "dislike" ? "border-red-500 text-red-600" : ""}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  별로에요 ({dislikes})
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  댓글 (0)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 팀 모집 카드 */}
          {idea.teamRecruitment?.isActive && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2 text-green-600" />팀 모집 중
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{idea.teamRecruitment.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">필요한 기술</h4>
                  <div className="flex flex-wrap gap-1">
                    {idea.teamRecruitment.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/ideas/${idea.id}/team`}>
                  <Button className="w-full">팀 참여 신청하기</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* 통계 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">아이디어 통계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">좋아요</span>
                  <span className="font-semibold text-green-600">{likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">별로에요</span>
                  <span className="font-semibold text-red-600">{dislikes}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">총 반응</span>
                  <span className="font-semibold">{likes + dislikes}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
