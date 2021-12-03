import React from 'react'
import { useAttribute } from '../../../threekit/react/hooks'



const PlusButton = () => {

    const setFillerValues = () => {
        const configuration = window.threekit.configurator.getConfiguration();

        Object.keys(configuration).forEach(element => {
            if (element.includes('Dummy')) {
                console.log(element)
                // window.threekit.configuration.setConfiguration({ element: 'b695c5b7-a36a-409a-a225-8b734d64c73f' })
            }
        });
    }
    const handleClick = () => {
        setFillerValues();
    }

    return (
        <>
            <button onClick={handleClick}>Click me</button>
        </>
    )
}

export default PlusButton
