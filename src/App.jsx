import { useHydra } from './useHydra'
import { useCallback, useEffect } from 'react'
import clsx from 'clsx';


function App() {
  const [canvasRef, hydraLoaded] = useHydra()

  useEffect(() => {
    if (!hydraLoaded) return;

    window.prepare = () => {
      s0.initCam();
      s1.initScreen();
      s2.initScreen();
      s3.initScreen();
      s4.initScreen();
      s5.initScreen();
    }
  }, [hydraLoaded]);

  const handleButton1Click = useCallback(() => {
    if (!hydraLoaded) return;
    src(s0)
      .mask(shape(4)
        .thresh()
        .scale(1.9)
      )
      .out(o1)
    src(o1).out();
    render(o0);
  }, [hydraLoaded])

  const handleButton2Click = useCallback(() => {
    if (!hydraLoaded) return;
    src(s1)
      .mask(shape(4)
        .scrollX(0.08)
        .thresh()
        .scale(1.8, 0.5)
      )
      .out(o2)
    src(s2)
      .mask(shape(4)
        .scrollX(0.08)
        .thresh()
        .scale(1.8, 0.5)
      )
      .out(o3)
    src(s3)
      .mask(shape(4)
        .scrollX(0.08)
        .thresh()
        .scale(1.8, 0.5)
      )
      .out(o4)
    src(s4)
      .mask(shape(4)
        .scrollX(0.08)
        .thresh()
        .scale(1.8, 0.5)
      )
      .out(o5)
    src(o1)
      .blend(src(o2), 0.5)
      .blend(src(o3))
      .blend(src(o4))
      .blend(src(o5))
      .out()
    render(o0)
  }, [hydraLoaded])

  const handleButton3Click = useCallback(() => {
    if (!hydraLoaded) return;

    osc().out()
  }, [hydraLoaded])

  return (
    <>
      <div className={clsx("fixed top-0 left-0 flex flex-row justify-evenly items-end z-40 font-extrabold text-blue-950 w-screen")}>
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
