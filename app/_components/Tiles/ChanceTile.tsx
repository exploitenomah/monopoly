import Space from "@/app/_classes/Space"
import QuestionMark from "@/app/_assets/image-components/QuestionMark"

export default function ChanceTile({ classType }: { classType: Space }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <QuestionMark fill={"#d12a2a"} />
    </div>
  )
}
