import { useHydra } from './useHydra'
import { useEffect } from 'react'
import clsx from 'clsx';


function App() {
  const [canvasRef, hydraLoaded] = useHydra()

  useEffect(() => {
    if (!hydraLoaded) return;

    // when it's loaded, run this script:
    noise().out();
  }, [hydraLoaded])

  return (
    <>
      <div className={clsx("fixed top-0 left-0 flex flex-row justify-between items-end z-40 font-extrabold text-white")}>
        <span className={clsx("text-inherit	")}> PRESENTE </span>
        <span className={clsx("text-inherit	")}> PRESENTES LINEALES</span>
        <span className={clsx("text-inherit	")}> PRESENTES SIMULTANEOS </span>
      </div>
      <div className={clsx("z-0")}>
        <canvas className={clsx("z-0")} style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', zIndex: "0" }} ref={canvasRef} />
      </div>
    </>
  )
}

export default App
