import { useHydra } from './useHydra'
import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx';


function App() {
  const [canvasRef, hydraLoaded] = useHydra()
  const [prepared, setPrepared] = useState(false)

  useEffect(() => {
    if (!hydraLoaded) return;

    solid().out();

    window.prepareSources = () => {
      s0.initCam();
      s1.initScreen();
      s2.initScreen();
      s3.initScreen();
      s4.initScreen();
      s5.initScreen();
      setPrepared(true);
    }
  }, [hydraLoaded]);

  const handleButton1Click = useCallback(() => {
    if (!hydraLoaded || !prepared) return;

    src(s0)
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o1)
    src(o1).scrollX(-0.2).out();
    render(o0);
  }, [hydraLoaded, prepared])

  const handleButton2Click = useCallback(() => {
    if (!hydraLoaded || !prepared) return;

    src(s1)
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o2)
    src(s2)
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o3)
    src(s3)
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o4)
    src(s4)
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o5)
    src(o1)
      .scrollX(-0.2)
      .luma(0.5)
      .thresh()
      .blend(src(o2).saturate(4).scrollX(-0.2), [-1, 0].smooth())
      .blend(src(o3).contrast(3).scrollX(-0.2), [0, 1].smooth())
      .blend(src(o4).scrollX(-0.2))
      .blend(src(o5).scrollX(-0.2))
      .out()
    render(o0)
  }, [hydraLoaded, prepared])

  const handleButton3Click = useCallback(() => {
    if (!hydraLoaded || !prepared) return;
    setFunction({
      name: 'simpleBorderDetection',
      type: 'color',
      inputs: [],
      glsl: `
      // Sobel kernels for X and Y directions
      // mat3 sobelX = mat3(
      //   -1.0, 0.0, 1.0,
      //   -2.0, 0.0, 2.0,
      //   -1.0, 0.0, 1.0
      // );
       mat3 sobelX = mat3(
         -1.0, 10.0, 1.0,
         -5.0, 0.0, 6.0,
         -1.0, 2.0, 1.0
       );
      mat3 sobelY = mat3(
        -1.0, -2.0, -1.0,
         0.0,  0.0,  0.0,
         1.0, 2.0,  1.0
      );
      vec2 texCoord = gl_FragCoord.xy / resolution.xy;
      vec3 sample[9];
      // Sample the neighboring pixels
      for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
          sample[(i+1)*3 + (j+1)] = texture2D(tex0, texCoord + vec2(float(i), float(j)) / resolution.xy).rgb;
        }
      }
      // Applying the Sobel filter
      float edgeX = 0.0;
      float edgeY = 0.0;
      for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
          edgeX += sobelX[i][j] * sample[i*3 + j].r;
          edgeY += sobelY[i][j] * sample[i*3 + j].r;
        }
      }
      // Combining the edges
      float edge = sqrt(edgeX * edgeX + edgeY * edgeY);
      // Outputting the final color
      return vec4(vec3(edge), 1.0);
      `
    });
    src(s0)
      .simpleBorderDetection()
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o1)
    src(s1)
      .simpleBorderDetection()
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o2)
    src(s2)
      .simpleBorderDetection()
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o3)
    src(s3)
      .simpleBorderDetection()
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o4)
    src(s4)
      .simpleBorderDetection()
      .mask(shape(4)
        .scrollX(0.1)
        .scrollY(0.1)
        .thresh()
        .scale(1.7)
      )
      .out(o5)
    src(o1)
      .scrollX(-0.2)
      .luma(0.5)
      .thresh()
      .blend(src(o2).saturate(4).scrollX(-0.2))
      .blend(src(o3).contrast(3).scrollX(-0.2))
      .blend(src(o4).scrollX(-0.2))
      .blend(src(o5).scrollX(-0.2))
      .out()
    render(o0)
  }, [hydraLoaded, prepared])

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
