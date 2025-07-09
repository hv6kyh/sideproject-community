export type Idea = {
  id: string
  title: string
  summary: string
  translated: string
  category: string[]
  date: string
  likes: number
  dislikes: number
  isBookmarked?: boolean
  teamRecruitment?: {
    isActive: boolean
    description: string
    requiredSkills: string[]
  }
}

export type Category = {
  id: string
  name: string
  count: number
}

export type SortOption = "latest" | "popular"
