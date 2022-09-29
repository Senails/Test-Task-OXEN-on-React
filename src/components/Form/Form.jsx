import {useSelector, useDispatch} from 'react-redux';
import { useRef } from 'react';

import './main.css';
import './inputs.css';
import './textandbutton.css';
import Loader from '../Loader/Loader';
import Input from '../Input/Input';
import {getString} from '../../Utils/getString';
import {formDisable , formEnable} from '../../Redux/Slices/formslice';
import {sendRequest} from '../../api/sendRequest';

let inputarr = [
    {type:'prise',text:'Стоимость автомобиля'},
    {type:'vznos',text:'Первоначальный взнос'},
    {type:'months',text:'Срок лизинга'},
]


export default function Form(){
    let {prise , vznos , len} = useSelector((state)=>state.form);
    let dispatch = useDispatch();
    let button = useRef();

    let initial = (vznos * prise / 100);
    let monthsum=(prise - initial) * ((0.035 * Math.pow((1 + 0.035), len)) / (Math.pow((1 + 0.035), len) - 1));
    
    let strMonth = getString(Math.ceil(monthsum) + '') + ' ₽';
    let strAll = getString(Math.ceil(vznos + monthsum * len) + '') + ' ₽';

    async function buttonclick(){
        dispatch(formDisable())
        button.current.classList.add('disabled');

        await sendRequest(prise,vznos,len);

        //Задержка только что бы показать лоадер
        setTimeout(()=>{
            button.current.classList.remove('disabled');
            button.current.classList.add('opacity');
            setTimeout(()=>{
                button.current.classList.remove('opacity');
                dispatch(formEnable())
            },500)
        },1000)
    }

    return <div className="form">
    <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
    <div className="inputs">
        {inputarr.map((elem,i)=>{
            return <div className="input_box" key={i}>
            <span>{elem.text}</span>
            <Input type={elem.type} max={elem.max} min={elem.min} now={elem.now}/>
        </div>})}
    </div>
    <div className="TextAndButton">
        <div>
            <span>Сумма договора лизинга</span>
            <span id="allprise">{strAll}</span>
        </div>
        <div>
            <span>Ежемесячный платеж от</span>
            <span id="monthprise">{strMonth}</span>
        </div>
        <div id="button" ref={button} onClick={buttonclick}>
            <span>Оставить заявку</span>
            <Loader/>
        </div>
    </div>
</div>
}