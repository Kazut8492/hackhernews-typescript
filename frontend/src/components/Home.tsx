import React, {useEffect, useState} from 'react'

interface Story {
    by: string,
    descendants: number,
    id: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

const Home: React.FC = () => {

    const [stories, setStories] = useState<[] | Story[]>([])

    useEffect(() => {
        const baseURL = 'https://hacker-news.firebaseio.com/v0'

        fetch(`${baseURL}/topstories.json`)
        .then(response => response.json())
        .then((data: number[]) => {
            const promises = data.slice(0, 100).map(id => fetch(`${baseURL}/item/${id}.json`))
            return Promise.all(promises)
        })
        .then(response => Promise.all(response.map(r => r.json())))
        .then(data => {
            console.log(data)
            setStories(data)
        })

    }, [])

    return (
        <div>
            {stories && stories.map((story: Story) => {
                return (<>
                    <h1>{story.title}</h1>
                </>)
            })}
        </div>
    )
}

export default Home