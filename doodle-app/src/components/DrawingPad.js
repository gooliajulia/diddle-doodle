import { useEffect, useRef, useState } from 'react';


const DrawingPad = () => {
    const colors = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226' ]
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [brushColor, setBrushColor] = useState(colors[0])

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight *2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d");
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = colors[Math.floor(Math.random()*colors.length)]
        // context.strokeStyle = brushColor;
        context.lineWidth = 90

        contextRef.current = context;

    }, [])

    const startDrawing = ({nativeEvent}) => {
    // setBrushColor(colors[Math.floor(Math.random()*colors.length)])
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX,offsetY)

    setIsDrawing(true)
    }

    const finishDrawing= () => {
    contextRef.current.closePath()
    setIsDrawing(false)
    // setBrushColor(colors[Math.floor(Math.random()*colors.length)])
    }

    const draw = ({nativeEvent}) => {
    if (!isDrawing) {
        return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke();
    }


    return (
        <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
    />
    )
}

export default DrawingPad