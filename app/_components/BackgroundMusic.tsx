
import AudioPlayer from 'react-h5-audio-player';
export function MainMusicPlayer({ autoPlay }: {
  autoPlay: boolean
}){
  return (
      <AudioPlayer
        autoPlay={autoPlay}
        src="/bg-music-main.mp3"
        onPlay={e => console.log("onPlay")}
        loop
        volume={0.3}
        showJumpControls={false}
        showFilledProgress={false}
      />
    )
}
export function IntroMusicPlayer({volume}: {
  volume?: number
}){
  return (
      <AudioPlayer
        autoPlay
        src="/bg-music-1.mp3"
        onPlay={e => console.log("onPlay")}
        loop
        volume={typeof volume === "number" ? volume : 0.3}
        showJumpControls={false}
        showFilledProgress={false}
      />
    )
}