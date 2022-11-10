import {CSSTransition, TransitionGroup} from 'react-transition-group'

import selectionState from '../util/selectionState';

import './charList.scss';

const CharList = ({status, data, fetching, addElemMyRef, onFocusCard, onCharId}) => {
    const renderItems = ({data}) => {
        let item = null

        if(data) {
            item = data.map(({id, name, thumbnail}, i) => {
                let style = {
                    'objectFit':'cover'
                }
                if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    style = {'objectFit':'unset'}
                }
                return (
                    <CSSTransition
                        key={id}
                        timeout={500}
                        classNames="char__item">
                            <li 
                                ref={addElemMyRef} 
                                tabIndex={0} 
                                className="char__item" 
                                key={id}
                                onClick={() => {
                                    onCharId(id)
                                    onFocusCard(i)
                                }}
                                onKeyDown={e => {
                                    if(e.key === 'Enter' || e.key === ' ') {
                                        onCharId(id)
                                        onFocusCard(i)
                                    }
                                }}
                            >
                                <img src={thumbnail} style={style} alt="abyss"/>
                                <div className="char__name">{name}</div>
                            </li>
                    </CSSTransition>
                )
            })
        }
            
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {item}
                </TransitionGroup>
            </ul>
        )
    }
    return (
        <div className="char__list">
            {selectionState(status, renderItems, data, fetching)}
            {/* <button 
                disabled={onSubloadItem} 
                style={displayBtn}
                className="button button__main button__long" 
                onClick={() => subload()}>
                    <div className="inner">load more</div>
            </button> */}
        </div>
    )
}






// const CharList = memo((props) => {
//     const [data, setCharList] = useState(null)
//     const [offset, setOffset] = useState(200)
//     const [onSubloadItem, setOnSubloadItem] = useState(false)
//     const [displayBtn, setDisplayBtn] = useState({'display': 'block'})
//     const myRef = []
//     const {status, setstatus, getAllCharacters, clearError} = DataRequest()

//     useEffect(() => {
//         getAllCharacters(offset)
//             .then(onCharListLoaded)
//             // eslint-disable-next-line
//     }, [])

//     const addElemMyRef = (elem) => {
//         myRef.push(elem)
//     }
//     const onFocusCard = (i) => {
//         myRef.forEach(item => item.classList.remove('char__item_selected'))
//         myRef[i].classList.add('char__item_selected')
//         myRef[i].focus()
//     }
    
//     const subload = () => {
//         clearError()
//         toglSubLoadItem()
//         getAllCharacters(offset + 9)
//             .then(onSubCharListLoaded)
//     }
//     const toglSubLoadItem = () => {
//         setOnSubloadItem(true)
//     }
//     const onSubCharListLoaded = (newCharList) => {
//         setCharList(() => ([...data, ...newCharList]))
//         setOffset(offset + 9)
//         setOnSubloadItem(false)
//         setDisplayBtn(newCharList.length < 9 ? {'display': 'none'} : {'display': 'block'})
//         setstatus('success')
//     }
//     const onCharListLoaded = (charList) => {
//         setCharList(() => (charList))
//         setstatus('success')
//     }
//     const renderItems = ({data}) => {
//         let item = null
//         if(data) {
//             item = data.map(({id, name, thumbnail}, i) => {
//                 let style = {
//                     'objectFit':'cover'
//                 }
//                 if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                     style = {'objectFit':'unset'}
//                 }
//                 return (
//                     <CSSTransition
//                         key={id}
//                         timeout={500}
//                         classNames="char__item">
//                             <li 
//                                 ref={addElemMyRef} 
//                                 tabIndex={0} 
//                                 className="char__item" 
//                                 key={id}
//                                 onClick={() => {
//                                     props.onCharId(id)
//                                     onFocusCard(i)
//                                 }}
//                                 onKeyDown={e => {
//                                     if(e.key === 'Enter' || e.key === ' ') {
//                                         props.onCharId(id)
//                                         onFocusCard(i)
//                                     }
//                                 }}
//                             >
//                                 <img src={thumbnail} style={style} alt="abyss"/>
//                                 <div className="char__name">{name}</div>
//                             </li>
//                     </CSSTransition>
//                 )
//             })
//         }
            
//         return (
//             <ul className="char__grid">
//                 <TransitionGroup component={null}>
//                     {item}
//                 </TransitionGroup>
//             </ul>
//         )
//     }
//     return (
//         <div className="char__list">
//             {selectionState(status, renderItems, data, onSubloadItem)}
//             <button 
//                 disabled={onSubloadItem} 
//                 style={displayBtn}
//                 className="button button__main button__long" 
//                 onClick={() => subload()}>
//                     <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }, areEqual)

export default CharList;