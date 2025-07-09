import { getIdeaById } from "@/lib/api"
import { IdeaDetailClient } from "@/components/idea-detail-client"
import { notFound } from "next/navigation"

interface IdeaDetailPageProps {
  params: {
    id: string
  }
}

export default async function IdeaDetailPage({ params }: IdeaDetailPageProps) {
  const idea = await getIdeaById(params.id)

  if (!idea) {
    notFound()
  }

  return <IdeaDetailClient idea={idea} />
}