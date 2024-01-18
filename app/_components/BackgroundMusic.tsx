
import AudioPlayer from 'react-h5-audio-player';
export function MainMusicPlayer(){
  return (
      <AudioPlayer
        autoPlay
        src="/bg-music-main.mp3"
        onPlay={e => console.log("onPlay")}
        loop
        volume={0.3}
        showJumpControls={false}
        showFilledProgress={false}
      />
    )
}
export function IntroMusicPlayer(){
  return (
      <AudioPlayer
        autoPlay
        src="/bg-music-1.mp3"
        onPlay={e => console.log("onPlay")}
        loop
        volume={0.3}
        showJumpControls={false}
        showFilledProgress={false}
      />
    )
}