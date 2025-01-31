import { useEffect, useRef, useState } from "react";
import Hydra from "hydra-synth";

export function useHydra() {
    const canvasRef = useRef(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const hydra = new Hydra({
            canvas: canvasRef.current,
            detectAudio: false,
            numSources: 10,
            numOutputs: 10,
        });

        window.hydra = hydra;
        setLoaded(true);

        return () => {
            hydra.hush();
        };
    }, [canvasRef]);

    return [canvasRef, loaded];
}
