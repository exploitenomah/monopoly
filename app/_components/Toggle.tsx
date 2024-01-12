


export default function Toggle({ checked, handleChange }: {
  checked: boolean,
  handleChange: () => void
}){
  return (
    <label className="relative">
        <input onChange={handleChange} checked={checked} type="checkbox" className="sr-only custom-toggle"/>
        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <div className="toggle-dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
    </label>
  )
}