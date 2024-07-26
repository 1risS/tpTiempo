import { useHydra } from './useHydra'
import { useCallback, useEffect } from 'react'
import clsx from 'clsx';


function App() {
  const [canvasRef, hydraLoaded] = useHydra()

  useEffect(() => {
    if (!hydraLoaded) return;

    // when it's loaded, run this script:
    noise().out(o9);
    src(o9).thresh().out(o7);
    render(o7)
  }, [hydraLoaded])

  const handleButton1Click = useCallback(() => {
    if (!hydraLoaded) return;

    s7.initCam();
    src(s7).out();
    render(o0);
  }, [hydraLoaded])

  const handleButton2Click = useCallback(() => {
    if (!hydraLoaded) return;

    s1.initScreen();
    src(s1).blend(src(s0), 0.5).out()
  }, [hydraLoaded])

  const handleButton3Click = useCallback(() => {
    if (!hydraLoaded) return;

    osc().out()
  }, [hydraLoaded])

  return (
    <>
      <div className={clsx("fixed top-0 left-0 flex flex-row justify-evenly items-end z-40 font-extrabold text-white w-screen")}>
        <button className={clsx("text-inherit")} onClick={handleButton1Click}>PRESENTE</button>
        <button className={clsx("text-inherit")} onClick={handleButton2Click}>PRESENTES LINEALES</button>
        <button className={clsx("text-inherit")} onClick={handleButton3Click}>PRESENTES SIMULTANEOS</button>
      </div>

      <div className={clsx("z-0")}>
        <canvas width={1920} height={1080} className={clsx("z-0")} style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', zIndex: "0" }} ref={canvasRef} />
      </div>
    </>
  )
}

export default App
