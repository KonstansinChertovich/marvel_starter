import { Link } from 'react-router-dom'

import selectionState from '../util/selectionState'

import './charComics.scss'


const CharComics = (props) => {
    const {status, data, fetching} = props

    const cardGenerator = ({data}) => {
        let item = null
        if(data) {
            item = data.map(({title, price, thumbnail, id}, i) => {
                return(
                    <li key={i} className='comics__item'>
                        <Link to={`/comics/${id}`}>
                            <img className='comics__item-img' src={thumbnail} alt={title} />
                            <div className='comics__item-name'>{title}</div>
                            <div className='comics__item-coins'>{price}</div>
                        </Link>
                    </li>
                )
            })
        }

        return (
            <ul className='comics__grid'>
                {item}
            </ul>
        )
    }

    return(
        <div className='comics__list'>
            {selectionState(status, cardGenerator, data, fetching)}
        </div>
    )
}

export default CharComics