export type CalorieDisplayProps = {
    calories: number
    text: string
}
export default function CalorieDisplay({calories, text} : CalorieDisplayProps) {
  return (
    <p 
            className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center"
            >   <span className="text-6xl font-black text-orange-500">{calories}</span>
                {text}
            </p>
  )
}
