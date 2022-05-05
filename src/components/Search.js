import {Link, Navigate} from "react-router-dom";
import React, {useState} from 'react';

export function Search(){

    const [value, setValue] = useState("")
    const [beers, setBeers] = useState([])
    const [fireRedirect, setFireRedirect] = useState(false)
    const [searchId, setSearchId]= useState("")

    async function handleSearchId(){

            const response = await fetch(`https://api.punkapi.com/v2/beers`)
            if (response.status !== 200) {
                throw new Error("Something went wrong ...")
            }
            const data = await response.json()

            const result = data.filter((e) => e.name === value)[0]
            console.log(result.id)
            return result.id

        }



    function handleSearch(event){
        setValue(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        handleSearchId().then(res=>{setSearchId(res)
            setFireRedirect(true)
        })



    }

    async function getBeerData(query){
        const response = await fetch(`https://api.punkapi.com/v2/beers`)
        if(response.status !== 200){
            throw new Error("Something went wrong ...")
        }
        const data = await response.json()
        return data
    }

    function handleShow() {
        getBeerData(value).then(data=>setBeers(data))
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>

                <label htmlFor="search">Search: </label>
                <input type="text" id="search" value={value} onChange={handleSearch}/>
                <button>find</button>
            </form>
            {fireRedirect && (
                <Navigate to={`/beer/${searchId}`}/>
            )}

            <h1>~ Our beers ~</h1>
            <button onClick={handleShow}>Show</button>

            {beers.map(beer=>(
                <div key={beer.id} style={{
                    border: '2px solid lightcoral',
                    borderRadius: '4px',
                    padding: '10px',
                    margin: '10px'
                }}>
                    <h2 style={{
                        color: 'coral'
                    }}

                    > <Link to={`/beer/${beer.id}`}>{beer.name}</Link></h2>
                    <h3>{beer.tagline}</h3>
                    <p>{beer.description}</p>

                    {beer.image_url ? (
                        <img style={{width: '10%'}} src={`https://images.punkapi.com/v2/${beer.id}.png`}
                             alt={`poster of ${beer.name}`}/>
                    ) : (
                        <h2>Sth went wrong...</h2>
                    )}

                </div>
                )

            )}
        </div>
    );
}

