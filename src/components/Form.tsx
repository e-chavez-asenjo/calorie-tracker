import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activityReducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}
export default function Form({ dispatch, state} : FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeId) {
      // console.log(state.activeId)
    const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
    setActivity(selectedActivity)
  }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['calories', 'category'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidChange = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      dispatch({
        type: 'save-activity',
        payload: {
          newActivity: activity
        }
      })

      setActivity({
        ...initialState,
        id: uuidv4()
      })
    }

  return (
    <form
    onSubmit={handleSubmit}
    className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
            <div className="grid grid-cols-1 gap-3">
                <label className=" font-bold" htmlFor="category">Categorias:</label>
                <select
                className="p-2 rounded-lg border border-slate-300 w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
                >
                {categories.map(category => (
                    <option
                    key={category.id}
                    value={category.id}
                    >
                    {category.name}
                    </option>
                ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <label className=" font-bold" htmlFor="name">Actividad:</label>
                <input 
                type="text" 
                id="name"
                className="p-2 rounded-lg border border-slate-300"
                placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Ejercicios, Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <label className=" font-bold" htmlFor="calories">Calorias:</label>
                <input 
                type="number" 
                id="calories"
                className="p-2 rounded-lg border border-slate-300"
                placeholder="Calorias ej. 300 o 500"
                value={activity.calories}
                onChange={handleChange}
                />
            </div>
            <input type="submit"
            className=" bg-gray-800 hover:bg-gray-900 text-white w-full p-2 uppercase font-bold cursor-pointer transition-colors disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidChange()}
            />
    </form>
  )
}
