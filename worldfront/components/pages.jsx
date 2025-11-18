'use client'
import {Section} from '../components/boxWrap'
//Fichier pour afficher l'ensemble des pages de notre site sous forme de fonction

const HomePage = () => {
    return (
        <Section className="relative min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-red">
                <h1>Loading...</h1>
            </div>
        </Section>
    )
}


const About = () => {
    return (
        <Section className="relative min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-red">
                <h1>Loading...</h1>
            </div>
        </Section>
    )
}

const Contact = () => {
    return (
        <Section className="relative min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-red">
                <h1>Loading...</h1>
            </div>
        </Section>
    )
}

export { HomePage, About, Contact }