import Card from "./Card"
import GameCard from "@/app/_classes/GameCard"

export default function CommunityChestCard({
  card,
  zIndex,
}: {
  card: GameCard
  zIndex: number
}) {
  return (
    <Card
      style={{
        perspective: "800px",
        position: "absolute",
        zIndex,
        right: "1%",
        top: "2%",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          backgroundImage: "url(/image-files/community-chest-card.png)",
          boxShadow: "-8px 7px 9px 0px #00000005", //conditional rotatex(-20deg)
        }}
        className="bg-cover bg-center absolute top-0 left-0 w-full h-full hover:animate-test rounded-[16px]"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#89d7f6] flex items-center justify-center rounded-[16px] text-center"
        style={{
          transform: "rotateY(180deg)", //conditional rotatex(20deg)
          backfaceVisibility: "hidden", //conditionall
        }}
      >
        {card.content}
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
