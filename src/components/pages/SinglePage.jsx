import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import DataRequest from "../../services/DataRequests"
import AppBanner from "../appBanner/AppBanner"

import selectionState from "../util/selectionState"


const CharacterDescriptions = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {getCharacters, getComic, status, clearError, setstatus} = DataRequest()
    
    useEffect(() => {
        onLoadedComicId()
        // eslint-disable-next-line
    }, [id])

    const updateData = (data) => {
        setData(() => data)
        setstatus('success')
    }

    const onLoadedComicId = () => {
        clearError()
        
        // eslint-disable-next-line
        switch(dataType) {
            // eslint-disable-next-line
            case 'character': 
                getCharacters(id).then(updateData)
                break
            // eslint-disable-next-line
            case 'comics':
                getComic(id).then(updateData)
        }
    }

    return(
        <>
            <AppBanner/>
            {selectionState(status, Component, data)}
        </>
    )
}

export default CharacterDescriptions