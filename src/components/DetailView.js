import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

export function DetailView(props) {
    const params = useParams()
    const [beer, setBeer] = useState(null)

    useEffect(() => {
        getBeerData(params.id).then((resp) => setBeer(resp)).catch((e) => e)
    })

    async function getBeerData(id) {
        const response = await fetch(`https://api.punkapi.com/v2/beers`)
        if (response.status !== 200) {
            throw new Error("Something went wrong ...")
        }
        const data = await response.json()

        const result = data.filter((e) => e.id == id)[0]
        return result
    }

    return (
        <div>

            {beer ? (


                <div key={beer.id} style={{
                    border: '2px solid lightcoral',
                    borderRadius: '4px',
                    padding: '10px',
                    margin: '10px'
                }}>
                    <h2 style={{
                        color: 'coral'
                    }}

                    ><Link to={`/beer/${beer.id}`}>{beer.name}</Link></h2>
                    <h3>{beer.tagline}</h3>


                    {beer.image_url ? (
                        <img style={{width: '10%'}} src={`https://images.punkapi.com/v2/${beer.id}.png`}
                             alt={`poster of ${beer.name}`}/>


                    ) : (
                        <h2>Sth went wrong...</h2>
                    )}
                    <p>{beer.description}</p>
                    <h4>Some additional information: </h4>
                    <p>First brewed:    {beer.first_brewed}</p>
                    <p>ABV:    {beer.abv}</p>
                    <p>ph:  {beer.ph}</p>

                    <p>Brevers tips:  {beer.brewers_tips}</p>
                    <p>Contributed by:  {beer.contributed_by}</p>


                    <Link to="/">Home</Link>

                </div>


            ) : (<h2>Loading...</h2>)}

        </div>
    );
}

