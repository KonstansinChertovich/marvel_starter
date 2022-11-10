
import { useHttpHooks } from "../hooks/http.hooks"


const DataRequest = () => {
    const _urlSrc = 'https://gateway.marvel.com:443/v1/public/characters'
    const _urlComics = 'https://gateway.marvel.com:443/v1/public/comics'
    const _apiKey = 'apikey=771029667325fc0068ee7c64c488ff68'
    const {loaded, error, status, request, clearError, setstatus} = useHttpHooks()

    const getCharacters = async (id) => {
        const rec = await request(`${_urlSrc}/${id}?${_apiKey}`)
        return _transformCharacter(rec.data.results[0])
    }
    const getNamesCharacters = async (name) => {
        const rec = await request(`${_urlSrc}?name=${name}&orderBy=name&${_apiKey}`)
        if(!rec.data.results[0]) {
            return undefined
        }
        return _transformCharacter(rec.data.results[0])
    }
    const getAllCharacters = async (offset = 9) => {
        const rec = await request(`${_urlSrc}?limit=9&offset=${offset}&${_apiKey}`)
        return rec.data.results.map(_transformCharacter)
    }
    const getAllComics = async (offset = 30) => {
        const rec = await request(`${_urlComics}?limit=8&offset=${offset}&${_apiKey}`)
        return await rec.data.results.map(_transformComics)
    }
    const getComic = async (id) => {
        const rec = await request(`${_urlComics}/${id}?${_apiKey}`)
        return _transformComics(rec.data.results[0])
    }
    const _transformComics = (obj) => {
        return {
            id: obj.id,
            title: obj.title,
            description: obj.description,
            language: obj.textObjects.length > 0 ? obj.textObjects[0].language : undefined,
            thumbnail: obj.thumbnail.path + '.' + obj.thumbnail.extension,
            pageCount: obj.pageCount,
            price: obj.prices[0].price
        }
    }
    const _transformCharacter = (obj) => {
        return {
            id: obj.id,
            name: obj.name,
            description: obj.description,
            thumbnail: obj.thumbnail.path + '.' + obj.thumbnail.extension,
            homeUrl: obj.urls[0].url,
            wikiUrl: obj.urls[1].url,
            comics: obj.comics.items
        }
    } 

    return {loaded, 
            error,
            status,
            getCharacters, 
            getAllCharacters, 
            getNamesCharacters, 
            getAllComics, 
            getComic, 
            clearError,
            setstatus}
}

export default DataRequest