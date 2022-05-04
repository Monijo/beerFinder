import React, {useState} from 'react';

export function Search(){

    const [value, setValue] = useState("")
    const [beers, setBeers] = useState([])

    function handleSearch(event){
        setValue(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        getBeerData(value).then(data=>setBeers(data))

    }

    async function getBeerData(query){
        const response = await fetch(`https://api.punkapi.com/v2/beers`)
        if(response.status !== 200){
            throw new Error("Something went wrong ...")
        }
        const data = await response.json()
        return data
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>

                <label htmlFor="search">Search: </label>
                <input type="text" id="search" value={value} onChange={handleSearch}/>
                <button>find</button>
            </form>
            {beers.map(beer=>(
                    <pre>{beer.name}</pre>
                )

            )}
        </div>
    );

}
