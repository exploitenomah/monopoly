import Card from "./Card"
import GameCard from "@/app/_classes/GameCard"

export default function CommunityChestCard({
  card,
  zIndex,
  isCurrent,
  handleDone
}: {
  card: GameCard
  zIndex: number
  isCurrent?: boolean
  handleDone: () => void
}) {

  return (
    <Card
      style={
        isCurrent
          ? {
              boxShadow: "-12px 20px 20px 0px #00000040",
              perspective: "300px",
              position: "absolute",
              zIndex: 16,
              transform:
                "rotateY(-180deg) rotate(180deg) translateX(0%) translateY(160%) rotate(-45deg) scale(1.6) rotateX(20deg)",
            }
          : {
              perspective: "800px",
              position: "absolute",
              zIndex,
              right: "1%",
              top: "2%",
              borderRadius: "16px",
            }
      }
    >
      <div
        style={{
          backgroundImage: "url(/image-files/community-chest-card.png)",
          boxShadow: "-8px 7px 9px 0px #00000005",
          transform: isCurrent ? "rotatex(22deg)" : "",
        }}
        className="bg-cover bg-center absolute top-0 left-0 w-full min-h-full hover:animate-test rounded-[16px]"
      />
      <div
        className="p-3 absolute top-0 left-0 w-full min-h-full bg-[#89d7f6] flex items-center justify-center flex-col rounded-[16px] text-center"
        style={{
          transform: isCurrent
            ? "rotatex(20deg) rotateY(180deg) rotateZ(180deg)"
            : "rotateY(180deg)",
          backfaceVisibility: isCurrent ? "visible" : "hidden",
          top: isCurrent ? "5%" : "0",
        }}
      >
        {card.content}
        <button onClick={handleDone} className="shadow-lg rounded-lg p-3 mt-3 text-primary-dark border border-current">
          ok
        </button>
      </div>
    </Card>
  )
}
//card.show styles
/*    box-shadow: -12px 20px 20px 0px #00000040
    perspective: 300px;
    position: absolute;
    z-index: 16;
    transform: rotateY(-180deg) translateX(15%) translateY(-150%) rotate(-45deg) scale(1.5) rotateX(20deg);
   */
