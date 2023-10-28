import Card from "./Card"
import GameCard from "@/app/_classes/GameCard"

export default function ChanceCard({
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
        left: "1%",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          backgroundImage: "url(/image-files/chance-card.webp)",
          boxShadow: "5px -8px 9px 0px #00000005", //conditional rotatex(-20deg)
        }}
        className="bg-contain bg-center absolute bottom-[-5%] left-0 w-full h-full hover:animate-test rounded-[16px]"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#f17a02] flex items-center justify-center rounded-[16px] text-center"
        style={{
          transform: "rotateY(180deg)", //conditional rotatex(20deg) rotateY(180deg) rotateZ(180deg) top 5%
          backfaceVisibility: "hidden", //conditionall
        }}
      >
        {card.content}
      </div>
    </Card>
  )
}
//card.show styles
/*
rotateY(-180deg) translateX(15%) translateY(-150%) rotate(-45deg) scale(1.5)

///
box-shadow: -12px 20px 20px 0px #00000040
    perspective: 300px;
    position: absolute;
    z-index: 16;
    transform: rotateY(-180deg) translateX(15%) translateY(-150%) rotate(-45deg) scale(1.5) rotateX(20deg);
   */
