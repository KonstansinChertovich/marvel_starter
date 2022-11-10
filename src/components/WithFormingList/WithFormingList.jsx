import { useState, useEffect, memo } from 'react';
import DataRequest from '../../services/DataRequests';

function areEqual(prevProps, nextProps) {
    return prevProps.onCharId === nextProps.onCharId
}

const WithFormingList = memo(({Component, onCharId, typeList}) => {
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(20)
    const [firstLoaded, setFirstloaded] = useState(true)
    const [fetching, setFetching] = useState(true)
    const [controlFetching, setControlFetching] = useState(true)
    const myRef = []
    const {status, setstatus, getAllCharacters, getAllComics, clearError} = DataRequest()
    
    useEffect(() => {
        if(fetching) {
            switch(typeList) {
                case 'comics':
                    getAllComics(offset)
                        .then(onSubCharListLoaded)
                        .finally(() => setFetching(false))
                        break
                case 'char' : 
                    getAllCharacters(offset)
                        .then(onSubCharListLoaded)
                        .finally(() => setFetching(false))
                        break
                default: return new Error()
            }
        }
        // eslint-disable-next-line
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', sclrollHendler)

        return () => {
            document.removeEventListener('scroll', sclrollHendler)
        }
        // eslint-disable-next-line
    }, [data])
    
    const addElemMyRef = (elem) => {
        myRef.push(elem)
    }
    const onFocusCard = (i) => {
        myRef.forEach(item => item.classList.remove('char__item_selected'))
        myRef[i].classList.add('char__item_selected')
        myRef[i].focus()
    }

    const onSubCharListLoaded = (newData) => {
        clearError()
        setData(() => ([...data, ...newData]))
        setOffset(offset + 9)
        setstatus('success')
        if(firstLoaded) {
            setFirstloaded(false)
        }
        if(newData.length < 8) {
            setControlFetching(false)
        }
    }
    const sclrollHendler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && controlFetching) {
            setFetching(true)
        }
    }
    
    return <Component 
                data={data}
                status={status}
                onCharId={onCharId}
                fetching={firstLoaded}
                addElemMyRef={addElemMyRef}
                onFocusCard={onFocusCard}
            />
}, areEqual)

export default WithFormingList