import { useState, useCallback } from "react";
import { useMatch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Preventer from "../preventer/Preventer";
import decoration from '../../resources/img/vision.png';

import WithFormingList from "../WithFormingList/WithFormingList";

const MainChar = () => {
    const [charId, setCharId] = useState(null)
    const onCharId = useCallback((id) => {
       setCharId(() => (id))
    },[])
    return(
           <CSSTransition in={useMatch('/')}
                  timeout={300}
                  classNames="page"
                  unmountOnExit>
                <div className="page">
                    <RandomChar/>
                    <div className="char__content">
                        <Preventer>
                            <WithFormingList Component={CharList} onCharId={onCharId} typeList={'char'}/>
                        </Preventer>
                        <Preventer>
                            <CharInfo charId={charId}/>
                        </Preventer>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </div>
           </CSSTransition>
    )
}

export default MainChar