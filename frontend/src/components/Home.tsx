import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';

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
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{story.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">by: {story.by}</Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the card content.
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </>)
            })}
        </div>
    )
}

export default Home