import { useState } from 'react';
import { useFormik } from 'formik';
import {Link} from 'react-router-dom'

import * as Yup from 'yup'
import DataRequests from '../services/DataRequests';

import './searchChar.scss';


const SearchChar = () => {
    const [nameId, setNameId] = useState(null)
    const {getNamesCharacters} = DataRequests()
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Введите имя!')
        }),
        onSubmit: values => getNamesCharacters(values.name).then(setNameId)
    })

    const boxContent = nameId !== null ? blockMessage(nameId) : null

    return(
        <div className='search'>
            <div className='search__name'>Or find a character by name:</div>
            <form onSubmit={formik.handleSubmit}>
                <input 
                    className='search__inp'
                    name='name' 
                    type="text" 
                    placeholder='Enter name' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}/>
                <button 
                    type='submit' 
                    className='button button__main'>
                    <div className='inner'>FIND</div>
                </button>
            </form>
            {formik.errors.name ? <div className='search__message'>{formik.errors.name}</div> : null}
            {boxContent}
        </div>
    )
}

function blockMessage(names) {
    let content = 'The character was not found. Check the name and try again',
        classes = 'search__message search__message_failure',
        btn = null

    if(names) {
        content = `There is! Visit ${names.name} page?`
        classes = 'search__message search__message_success'
        btn = <Link to={`/character/${names.id}`}  
                    className='button button__secondary'>
                        <div className='inner'>TO PAGE</div>
                </Link> 
    }
    return(
        <div className={classes}>
            {content}
            {btn}
        </div>
    )
}


export default SearchChar;