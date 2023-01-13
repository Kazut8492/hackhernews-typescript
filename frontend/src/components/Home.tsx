import React, {useEffect} from 'react'

const Home: React.FC = () => {

    useEffect(() => {
        const baseURL = 'https://hacker-news.firebaseio.com/v0'

        fetch(`${baseURL}/topstories.json`)
        .then(response => response.json())
        .then((data: number[]) => {
            const promises = data.slice(0, 100).map(id => fetch(`${baseURL}/item/${id}.json`))
            return Promise.all(promises)
        })
        .then(response => Promise.all(response.map(r => r.json())))
        .then(data => console.log(data))

    }, [])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home