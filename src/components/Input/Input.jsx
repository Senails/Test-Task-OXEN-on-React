import './input.css';
import './polzunok.css';
import { useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setlen, setprise, setvznos } from '../../Redux/Slices/formslice';
import { getString } from '../../Utils/getString';
import { inputValidator1,inputValidator2,inputValidator3 } from '../../Utils/inputhandlers';

export default function Input({type}){
    let {prise , vznos , len , disable} = useSelector((state)=>state.form);
    let dispatch =useDispatch();
    const [value, setvalue] = useState(getvalue());
    let polzunok = useRef(null);
    let line = useRef(null);

    useEffect(()=>{
        setvalue(getvalue())
    },[prise , vznos , len])

    useEffect(() => {
        let polz = polzunok.current;
        polz.addEventListener('mousedown',rangeMouse);
        polz.addEventListener('touchstart',rangeTuchpad);

        function rangeMouse(event) {
            if (disable) return
            document.addEventListener('mousemove', func1);
            document.addEventListener('mouseup', func2);
    
            let allweight = this.parentElement.parentElement.parentElement.clientWidth;
            let line = this.parentElement.parentElement;
            let weight = line.clientWidth;
            let xstart = event.clientX;
    
            function func1(e) {
                e.preventDefault();
                let xnow = e.clientX;
                let different = xnow - xstart;
                let newWeight = weight + different;
                if (newWeight <= 0) {
                    newWeight = 0
                }
                if (newWeight >= allweight) {
                    newWeight = allweight;
                }
                let percentres = newWeight / allweight;

                line.style.width = Math.floor(percentres*1000)/10 + '%';
                actionresult(percentres)
            }
    
            function func2(e) {
                e.preventDefault();
                document.removeEventListener('mousemove', func1);
                document.removeEventListener('mouseup', func2);
            }
        }

        function rangeTuchpad(event) {
            if (disable) return
            document.addEventListener('touchmove', func1);
            document.addEventListener('touchend', func2);
    
            let allweight = this.parentElement.parentElement.parentElement.clientWidth;
            let line = this.parentElement.parentElement;
            let weight = line.clientWidth;
            let xstart = event.touches[0].pageX;
    
            function func1(e) {
                let xnow = e.touches[0].pageX;
    
                let different = xnow - xstart;
                let newWeight = weight + different;
                if (newWeight <= 0) {
                    newWeight = 0
                }
                if (newWeight >= allweight) {
                    newWeight = allweight;
                }
                let percentres = newWeight / allweight;
                line.style.width = Math.floor(percentres*1000)/10 + '%';
                actionresult(percentres)
            }
    
            function func2(e) {
                document.removeEventListener('touchmove', func1);
                document.removeEventListener('touchend', func2);
            }
        }

        function actionresult(resultrange) {
            if (type==='prise'){
                let difference = 5000000;
                let res = Math.ceil((1000000 + difference * resultrange) / 10000) * 10000;
                dispatch(setprise(res));
            }
            if (type==='vznos'){
                let difference = 50;
                let res = Math.ceil((10 + difference * resultrange) / 1) * 1;
                dispatch(setvznos(res))
            }
            if (type==='months'){
                let difference = 59;
                let res = Math.ceil((1 + difference * resultrange) / 1) * 1;
                dispatch(setlen(res))
            }
        }
        
        return () => {
            polz.removeEventListener('mousedown',rangeMouse);
            polz.removeEventListener('touchstart',rangeTuchpad);
        };
    }, [disable]);


    function getvalue(){
        let value = getString(prise+'');
        if (type==='vznos'){
            value = getString(prise*vznos/100+'')+' ₽';
        }
        if (type==='months'){
            value = len;
        }
        return value
    }

    function changeHandler(e){
            if(e.target.value.length<15){
            setvalue(e.target.value)
        }
    }

    function blurHandler(e){
        let linewight;

        if (type==='prise'){
            let res = inputValidator1(e.target.value);
            dispatch(setprise(res))

            linewight=Math.ceil(((res-1000000)/5000000)*100)+'%'
        }
        if (type==='vznos'){
            let res = inputValidator2(e.target.value,prise)
            dispatch(setvznos(res))

            linewight=Math.ceil(((res-10)/50)*100)+'%'
        }
        if (type==='months'){
            console.log(e.target.value)
            let res = inputValidator3(e.target.value);
            dispatch(setlen(res))

            linewight=Math.ceil(((res-1)/59)*100)+'%'
        }

        line.current.style.width=linewight;
    }


    return <>
        <div className={`input `+(disable?'disabled':'')}>
            <input type="text" value={value} disabled={disable} onChange={changeHandler} onBlur={blurHandler}/>
            { type==='prise'?
            <div className="rightelem">₽</div>: 
            type==='vznos'?
            <div className="rightelem">
                <div className="percent">
                    {vznos}%
                </div>
            </div>:
            <div className="rightelem">
            мес.
           </div>
           }
        </div>
        <div className={"polzunok "+(disable?'disabled':'')}>
            <div ref={line} className="line">
                <div className="point">
                    <div ref={polzunok} className="circle"></div>
                </div>
            </div>
        </div>
    </>
}