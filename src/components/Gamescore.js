import {FaStar, FaRedo} from 'react-icons/fa'
import {useStopwatch} from 'react-timer-hook';
const Gamescore = ({counter, counterFalse, restart}) => {
    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });

   
    return (
        <section className='gamescore' >
            <div className = 'stars float-left'>
                <FaStar className = {counterFalse >= 3 ? 'empty' : ''}/> 
                <FaStar className = {counterFalse >= 2 ? 'empty' : ''}/> 
                <FaStar className = {counterFalse >= 1 ? 'empty' : ''}/>
            </div>
            <div className='time' style={{fontSize: '20px'}}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <div>
                <FaRedo onClick = {() => {restart(); reset()}} />
            </div>

            <div className= 'moves float-right' >
                <span>{counter} </span> Moves 
                
            </div>
        </section>
    )
}

export default Gamescore;
