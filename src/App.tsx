import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { activityReducer, initialState } from "./reducers/activityReducer"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = ( ) => useMemo( () => state.activities.length > 0, [state.activities])

  return (
    <>
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
            <h1
              className="text-center text-3xl font-bold text-white uppercase">
              Contador de Calorias
            </h1>
            <button
              className="bg-slate-600 hover:bg-slate-800 p-3 rounded-lg text-sm text-white font-bold uppercase cursor-pointer disabled:opacity-50"
              disabled={!canRestartApp()}
              onClick={() => dispatch({type: 'reset-activities'})}
            >
              Reiniciar App
            </button>
      </div>
    </header>
    <section className="bg-lime-500 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <Form
          dispatch={dispatch}
          state={state}
        />
      </div>
    </section>
    <section className="py-10  bg-gray-800"> 
      <div className="max-w-4xl mx-auto">
        <CalorieTracker
          activities={state.activities}
        />
      </div>
    </section>
    <section className="py-10 mx-auto max-w-4xl bg-gray-50">
      <ActivityList
        activities={state.activities}
        dispatch={dispatch}
      />
    </section>
    </>
  )
}

export default App
