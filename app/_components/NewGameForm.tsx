import {
  useState,
  MutableRefObject,
  useCallback,
  HTMLInputTypeAttribute,
  FormEventHandler,
} from "react"
import useGetRandomName from "../_hooks/useGetRandomName"

export default function NewGameForm({
  show,
  formRef,
  handleSubmit,
  close,
}: {
  show: boolean
  formRef: MutableRefObject<HTMLFormElement | null>
  handleSubmit: (formValues: {
    name: string
    password: string
    totalPlayers: number
    id: string
  }) => void
  close: () => void
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    totalPlayers: 2,
    id: crypto.randomUUID(),
  })
  const getRandomName = useGetRandomName()
  const handleChange = useCallback((name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const resetForm = useCallback(
    () =>
      setFormValues({
        name: "",
        password: "",
        totalPlayers: 2,
        id: crypto.randomUUID(),
      }),
    []
  )
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      handleSubmit({ ...formValues, totalPlayers: +formValues.totalPlayers })
      resetForm()
      close()
    },
    [formValues, handleSubmit, close, resetForm]
  )

  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className={`${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      } px-8 flex flex-col justify-center gap-y-[1.5rem] text-primary-dark z-10 transition-all fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-default w-[85vw] min-h-[70vh] md:w-[58vmin] md:h-[65vmin] rounded-lg`}
    >
      <div className="w-full flex items-end">
        <span className="text-3xl font-bold capitalize">Create a new game</span>
        <button
          type="button"
          className="font-bold text-[0.8] ml-auto"
          onClick={() => {
            close()
            resetForm()
          }}
        >
          close.
        </button>
      </div>
      <div className="flex flex-col gap-y-1">
        <FormInput
          onChange={handleChange}
          name="name"
          value={formValues.name}
          type="text"
          required
          label={"Name your game"}
        />
        <button
          type="button"
          onClick={() => {
            handleChange("name", getRandomName())
          }}
          className="self-end text-blue-800"
        >
          get random name
        </button>
      </div>
      <FormInput
        onChange={handleChange}
        name="password"
        value={formValues.password}
        type="password"
        required
        label={"Game Password"}
      />
      <FormInput
        onChange={handleChange}
        name="totalPlayers"
        value={formValues.totalPlayers}
        type="number"
        min={2}
        max={6}
        required
        label={"Number of players"}
      />
      <button
        type="submit"
        className="rounded-lg font-bold text-[1rem] shadow-2xl hover:scale-[1.03] active:scale-[0.98] bg-primary-dark text-primary-default w-full max-w-[200px] mx-auto py-[0.83rem] px-[1rem] "
      >
        Create Game
      </button>
    </form>
  )
}

function FormInput({
  onChange,
  name,
  value,
  type,
  min,
  max,
  required,
  label,
}: {
  name: string
  value: any
  type: HTMLInputTypeAttribute
  onChange: (name: string, value: any) => void
  min?: number
  max?: number
  required: boolean
  label: string
}) {
  return (
    <label className="flex flex-col w-full mx-auto gap-y-3">
      <span className="font-semibold">{label}</span>
      <input
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className="rounded-lgbg-transparent invalid:focus:border-red-600 py-[0.83rem] px-[1rem] border-solid border border-primary-dark focus:border-dotted focus:border-blue-600 focus:outline-0"
        name={name}
        value={value}
        type={type}
        min={min}
        max={max}
        required={required}
      />
    </label>
  )
}
