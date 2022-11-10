import { useState, useEffect } from 'react';
import DataRequest from '../../services/DataRequests';

import selectionState from '../util/selectionState';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [data, setCharacter] = useState(null)
    const {status, setstatus, getCharacters, clearError} = DataRequest()

    useEffect(() => {
        updateСall()
        // eslint-disable-next-line
    }, []) 

    function updateСall() {
        servicesMarvel()
    }

    function servicesMarvel() {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        clearError()
        getCharacters(id)
            .then(updateCharacter)
    }
    
    function updateCharacter(data) {
        setCharacter(() => data)
        setstatus('success')
    }


    const renderCharacter = ({data}) => {
        const {name, thumbnail, description, homeUrl, wikiUrl} =  data
        let style = {'objectFit': 'cover'}
        let descr = description.length > 150 ? description.slice(0, 150) + '...' : description

        if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            style = {
                'objectFit': 'unset'
            }
        }

        return(
            <div className="randomchar__block">
                <img src={thumbnail} style={style} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {descr}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homeUrl} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikiUrl} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="randomchar">
                {selectionState(status, renderCharacter, data)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateСall}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;



// class RandomChar extends Component {
//     state = {
//         character: {},
//         loader: true,
//         error: false
//     }

//     componentDidMount() {
        
//         this.updateСall()
//     }

//     marvelService = new DataRequest()

//     updateСall = () => {
//         this.setState({
//             loader: true,
//             error: false
//         })
//         this.servicesMarvel()
//     }
//     servicesMarvel = () => {
//         const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
//         this.marvelService.getCharacters(id)
//             .then(this.updateCharacter)
//             .catch(this.errorState)
//     }

//     updateCharacter = (character) => {
//         this.setState({
//             character,
//             loader: false
//         })
//     }
//     errorState = () => {
//         this.setState({
//             loader: false,
//             error: true
//         })
//     }
    
//     renderCharacter = () => {
//         const {name, thumbnail, description, homeUrl, wikiUrl} = this.state.character
//         let style = {'objectFit': 'cover'}
//         let descr = description.length > 150 ? description.slice(0, 150) + '...' : description

//         if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//             style = {
//                 'objectFit': 'unset'
//             }
//         }

//         return(
//             <div className="randomchar__block">
//                 <img src={thumbnail} style={style} alt="Random character" className="randomchar__img"/>
//                 <div className="randomchar__info">
//                     <p className="randomchar__name">{name}</p>
//                     <p className="randomchar__descr">
//                         {descr}
//                     </p>
//                     <div className="randomchar__btns">
//                         <a href={homeUrl} className="button button__main">
//                             <div className="inner">homepage</div>
//                         </a>
//                         <a href={wikiUrl} className="button button__secondary">
//                             <div className="inner">Wiki</div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     render() {
//         const {loader, error} = this.state
//         const spinner = loader ? <Spinner/> : null
//         const errors = error ? <ErrorMessage/> : null
//         const content = (loader || error) ? null : this.renderCharacter()

//         return (
//             <div className="randomchar">
//                     {errors}
//                     {spinner}
//                     {content}
//                 <div className="randomchar__static">
//                     <p className="randomchar__title">
//                         Random character for today!<br/>
//                         Do you want to get to know him better?
//                     </p>
//                     <p className="randomchar__title">
//                         Or choose another one
//                     </p>
//                     <button className="button button__main" onClick={this.updateСall}>
//                         <div className="inner">try it</div>
//                     </button>
//                     <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
//                 </div>
//             </div>
//         )
//     }
// }

// export default RandomChar;