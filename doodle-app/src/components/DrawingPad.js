import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm';

const generator = rough.generator();

const colors = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226' ]

const createElement = (x1,y1,x2,y2) => {
    const roughElement = generator.line(x1,y1,x2,y2, {stroke: colors[Math.floor(Math.random()*colors.length)]})
    return {x1,y1,x2,y2, roughElement}
}

const DrawingPad = () => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [brushColor, setBrushColor] = useState(colors[0])
    let canvas;
    let context;
    const [elements, setElements] = useState([])
    const [drawing, setDrawing] = useState(false)

    


    useEffect(() => {

            const canvas = canvasRef.current;
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const roughCanvas = rough.canvas(canvas)
            roughCanvas.circle(100, 100, 200, {stroke: 'purple'})
            // roughCanvas.circle(150,150,200)
            const rect = generator.rectangle(10,10,100,100)
            // roughCanvas.draw(rect)
            const line = generator.line(50,40,60,70)
            // roughCanvas.draw(line)
    
            const context = canvas.getContext("2d");
            context.scale(2,2)
            context.lineCap = "round"
    
            context.strokeStyle = brushColor;
            context.lineWidth = 20
    
            contextRef.current = context;

            elements.forEach(({roughElement}) => roughCanvas.draw(roughElement))
        }, [elements])

    useEffect(() => {
        if (context) {
        context.scale(2,2)
        context.lineCap = "round"

        context.strokeStyle = brushColor;
        context.lineWidth = 20

        contextRef.current = context;
        }
    }, [brushColor])



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
    setBrushColor(colors[Math.floor(Math.random()*colors.length)])
    }

    const draw = ({nativeEvent}) => {
    if (!isDrawing) {
        return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke();
    }

    const handleMouseDown = (ev) => {
        setDrawing(true);

        const { clientX, clientY } = ev;

        const element = createElement(clientX,clientY,clientX,clientY)
        setElements(prevState => [...prevState, element])
    }

    const handleMouseMove = (ev) => {
        if (!drawing) return;

        const {clientX,clientY} = ev
        const index = elements.length -1;
        const {x1, y1 } = elements[index]
        const updatedElement = createElement(x1,y1, clientX, clientY)

        const elementsCopy = [...elements];
        elementsCopy[index] = updatedElement
        setElements(elementsCopy)

        console.log(clientX, clientY);
    }

    const handleMouseUp = () => {
        setDrawing(false);
    }


    return (
        <>
            <canvas
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                ref={canvasRef}
            />
        </>
    )
}

export default DrawingPad