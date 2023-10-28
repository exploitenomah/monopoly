export default function LoadingDisplay() {
  return (
    <div>
      <div className="flex space-x-2 justify-center items-center bg-primary-dark w-screen h-screen">
        <span className="text-primary-default not-sr-only">Loading...</span>
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-primary-default rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-primary-default rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-primary-default rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}
