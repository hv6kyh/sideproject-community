"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Bookmark, Users, ThumbsUp, ThumbsDown } from "lucide-react"
import type { Idea } from "@/types/idea"

interface IdeaCardProps {
  idea: Idea
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(idea.isBookmarked || false)
  const [likes, setLikes] = useState(idea.likes)
  const [dislikes, setDislikes] = useState(idea.dislikes)
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleReaction = (type: "like" | "dislike") => {
    if (userReaction === type) {
      // 같은 반응 클릭 시 취소
      if (type === "like") {
        setLikes(likes - 1)
      } else {
        setDislikes(dislikes - 1)
      }
      setUserReaction(null)
    } else {
      // 다른 반응으로 변경
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
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Link href={`/ideas/${idea.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {idea.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{new Date(idea.date).toLocaleDateString("ko-KR")}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={isBookmarked ? "text-blue-600" : "text-gray-400"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{idea.translated}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {idea.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction("like")}
                className={userReaction === "like" ? "text-green-600" : "text-gray-500"}
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="ml-1 text-xs">{likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction("dislike")}
                className={userReaction === "dislike" ? "text-red-600" : "text-gray-500"}
              >
                <ThumbsDown className="h-4 w-4" />
                <span className="ml-1 text-xs">{dislikes}</span>
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1 text-xs">댓글</span>
            </Button>
          </div>

          {idea.teamRecruitment?.isActive && (
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Users className="h-3 w-3 mr-1" />팀 모집
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
