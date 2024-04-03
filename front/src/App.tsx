import { useEffect } from "react";
import { useBakkesmod } from "./hooks/useBakkesmod";
import { useFeedEventListener } from "./events";

function App() {

  const data = useBakkesmod()

  useFeedEventListener((event: any) => {
    console.log(event)
  })

  // useEffect(() => {
  //   console.log(data)
  // }, [data])


  return (
    <div>testing</div>
  );
}

export default App;
