import { HomePage } from "@/screens/home/home-page"
import { FpsTracker } from "@/shared/ui/fps-tracker/fps-tracker"

const App = () => {
  return (
    <>
      <FpsTracker />
      <HomePage />
    </>
  )
}

export default App
