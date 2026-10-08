import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Console } from '@zikojs/preact-console'
const App = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch('https://api.github.com/users/zakarialaoui10')
            .then(res => res.json())
            .then(setUser)
            .catch(console.error)
    }, [])
    return (
        <>
            <Console.log> Hello from @zikojs/preact-console</Console.log>
            <Console.log>Dependencies:</Console.log>
            <Console.table>
                {['preact','ziko', '@zikojs/preact', '@zikojs/console']}
            </Console.table>
            {user && (
                <Console.log>
                    {user}
                </Console.log>
            )}
        </>
    )
}
render(
    <App />,
    document.getElementById('app')
)