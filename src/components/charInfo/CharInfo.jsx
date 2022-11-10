import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataRequest from '../../services/DataRequests';
import SearchChar from '../../searchChar/SearchChar';

import selectionState from '../util/selectionState';

import './charInfo.scss';




const CharInfo = (props) => {
    const [data, setCharList] = useState(null)
    const {status, setstatus, getCharacters, clearError} = DataRequest()

    useEffect(() => {
        onLoadedCharId()
        // eslint-disable-next-line
    }, [props.charId])

    const onCharListLoaded = (data) => {
        setCharList(() => (data))
        setstatus('success')
    }

    const onLoadedCharId = () => {
        const {charId} = props
        if(!charId) {
            return
        }
        clearError()
        getCharacters(charId)
            .then(onCharListLoaded)
    }

    return (
        <div>
            <div className="char__info">
                {selectionState(status, () => charRender(data))}
            </div>
            <SearchChar/>
        </div>
        
    )
}

function charRender(data) {
    const {name, description, thumbnail, wikiUrl, homeUrl, comics} = data
    let iconStyle = {'objectFit': 'cover'}
    
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        iconStyle = {'objectFit': 'contain'}
    }

    return(
        <>
            <div className='char__basics'>
                <img src={thumbnail} style={iconStyle} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homeUrl} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikiUrl} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics: {comics.length === 0 ? 'this character has no comics' : null}</div>
            <ul className="char__comics-list">
                {
                    comics.slice(0, 10).map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${comics[0].resourceURI.slice(-5)}`}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;





// class CharInfo extends Component {
//     state = {
//         charList: null,
//         loaded: false,
//         error: false
//     }
//     marvelService = new DataRequest()

//     componentDidUpdate(prevProps) {
//         if(this.props.charId !== prevProps.charId) {
//             this.onLoadedCharId()
//         }
//     }
//     onLoadedCharId = () => {
//         const {charId} = this.props
//         if(!charId) {
//             return
//         }
//         this.onSpinner()

//         this.marvelService
//             .getCharacters(charId)
//             .then(this.onCharListLoaded)
//             .catch(this.errorMessage)
//     }
//     onCharListLoaded = (charList) => {
//         this.setState({
//             charList, 
//             loaded: false
//         })
//     }
//     onSpinner = () => {
//         this.setState({
//             loaded: true
//         })
//     }
//     errorMessage = () => {
//         this.setState({
//             loaded: false,
//             error: true
//         })
//     }
    

//     render() {
//         const {loaded, charList, error} = this.state
//         const skeleton = charList || loaded || error ? null : <Skeleton/>
//         const content = !(loaded || error || !charList) ? charRender(this.state.charList) : null 
//         const spinner = loaded ? <Spinner/> : null
//         const errors = error ? <ErrorMessage/> : null

//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {spinner}
//                 {errors}
//                 {content}
//             </div>
//         )
//     }
// }

// const charRender = (charList) => {
//     const {name, description, thumbnail, wikiUrl, homeUrl, comics} = charList
//     let iconStyle = {'objectFit': 'cover'}
    
//     if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//         iconStyle = {'objectFit': 'contain'}
//     }

//     return(
//         <>
//             <div className="char__basics">
//                 <img src={thumbnail} style={iconStyle} alt={name}/>
//                 <div>
//                     <div className="char__info-name">{name}</div>
//                     <div className="char__btns">
//                         <a href={homeUrl} className="button button__main">
//                             <div className="inner">homepage</div>
//                         </a>
//                         <a href={wikiUrl} className="button button__secondary">
//                             <div className="inner">Wiki</div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             <div className="char__descr">
//                 {description}
//             </div>
//             <div className="char__comics">Comics: {comics.length === 0 ? 'this character has no comics' : null}</div>
//             <ul className="char__comics-list">
//                 {
//                     comics.slice(0, 10).map((item, i) => {
//                         return(
//                             <li key={i} className="char__comics-item">
//                                 {item.name}
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//         </>
//     )
// }

// export default CharInfo;