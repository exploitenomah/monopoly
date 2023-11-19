import Card from "./Card"
import GameCard from "@/app/_classes/GameCard"
export default function ChanceCard({
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
                "rotateY(-180deg) translateX(15%) translateY(-150%) rotate(-45deg) scale(1.5) rotateX(20deg)",
            }
          : {
              perspective: "800px",
              position: "absolute",
              zIndex,
              left: "1%",
              borderRadius: "16px",
            }
      }
    >
      <div
        style={{
          backgroundImage: "url(/image-files/chance-card.webp)",
          boxShadow: "5px -8px 9px 0px #00000005",
          transform: isCurrent ? "rotatex(20deg)" : "",
        }}
        className="bg-contain bg-center absolute bottom-[-5%] left-0 w-full h-full hover:animate-test rounded-[16px]"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#f17a02] flex items-center justify-center flex-col rounded-[16px] text-center"
        style={{
          transform: isCurrent
            ? "rotatex(20deg) rotateY(180deg) rotateZ(180deg)"
            : "rotateY(180deg)",
          backfaceVisibility: isCurrent ? "visible" : "hidden", //conditionall
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
/*
rotateY(-180deg) translateX(15%) translateY(-150%) rotate(-45deg) scale(1.5)

///
box-shadow: -12px 20px 20px 0px #00000040
    perspective: 300px;
    position: absolute;
    z-index: 16;
    transform: rotateY(-180deg) translateX(15%) translateY(-150%) rotate(-45deg) scale(1.5) rotateX(20deg);
    
   */
