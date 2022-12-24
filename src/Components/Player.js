import React, { useEffect, useState } from 'react'
import { usePlayerValue } from '../Context/PlayerContext'
import Allmusic from '../dados/Allmusic'
import { useGetMusic } from '../hooks/useGetMusic'
import { useInfoMusic } from '../hooks/useInfoMusic'
import styles from './Player.module.css'

const Player = () => {
    const {index} = usePlayerValue()
    let [indexMusic, SetIndexMusic] = useState(index)
    const {music} = useGetMusic(indexMusic)
    const {getDuration, clickWidth} = useInfoMusic()
    const [play, setPlay] = useState(false) //Borboleta@canibal25
    const [show, setShow] = useState(false)
    const [css, setCss] = useState(styles.music_list)
    const [audio, setAudio] = useState(new Audio(`musc/${music.src}.m4a`))
    const [currentTime, setCurrentTime] = useState(`0:00`)
    const [AudioDuration, setAudioDuration] = useState()
    const [width, setWidth] = useState(0)
    const [cssRep, SetCssRep] = useState("repeat")
    let [type, setType] = useState(1)
    let min
    let sec
    audio.ontimeupdate = (e) =>{
        let currentTime = e.target.currentTime;
        let duration = e.target.duration;
        let width = (currentTime/duration)*100
        min = Math.floor(currentTime / 60)
        sec = Math.floor(currentTime % 60)
        if (sec < 10) {
            sec = `0${sec}`;
        }
        setWidth(`${width}%`)
        setCurrentTime(`${min}:${sec}`)

    }
    audio.onloadedmetadata = () =>{
        let audiodec = audio.duration
        min = Math.floor(audiodec / 60)
        sec = Math.floor(audiodec % 60)
        if (sec < 10) {
            sec = `0${sec}`;
        }
        setAudioDuration(`${min}:${sec}`)

    }
    const next = () =>{
        if (indexMusic >= 7) {
            SetIndexMusic(1)
        } else{
            SetIndexMusic(indexMusic+= 1)
        }
        setWidth(0)
        setCurrentTime(`0:00`)
        audio.pause()
    }
    const prev = () =>{
        if (indexMusic <= 1) {
            SetIndexMusic(7)
        } else{
            SetIndexMusic(indexMusic-= 1)
        }
        setCurrentTime(`0:00`)
        setWidth(0)
        audio.pause()
    }
    audio.onended = () => {
        switch (type) {
            case (1):
                    next()
                break;
            case (2):
                    audio.currentTime = 0
                    audio.play()
                    console.log("certo")
                break;
            case (3):
                let rm
                audio.pause()
                do {
                    rm = Math.floor((Math.random() * Allmusic.length) + 1);
                } while (indexMusic === rm);
                SetIndexMusic(rm)
                break;
            default:

                break;
        }
    }
    const playList = (index) =>{
        SetIndexMusic(index)
        setShow(!show)
        setWidth(0)
        setCurrentTime(`0:00`)
        audio.pause()
    }
    useEffect(() => {
        setAudio(new Audio(`musc/${music.src}.m4a`))
    }, [ music.src, index])
    useEffect(() => {
        play ? audio.play() : audio.pause()
    }, [audio, play])
    const mod = () =>{
        setType(type+= 1)
        if (type >= 3) {
            setType(0)
        }
        if (type === 1) {
            SetCssRep("repeat")
        }else if(type===2){
            SetCssRep("repeat_one")
        }else{
            SetCssRep("shuffle")
        }
        console.log(type)
    }
    useEffect(() => {
        show ? setCss(styles.show) : setCss(styles.music_list) 
    }, [show])
   
  return (
    <div className={styles.container} >
        <div className={styles.content}>
          <div className={styles.header}>
          <i className='bx bx-chevron-left'></i>
              <span>Tocando agora</span>
              <i className='bx bx-dots-vertical-rounded'></i>
          </div>
          <div className={styles.imgare}>
          <img src={`img/${music.img}.jpg`} alt="" />

          </div>
          <div className={styles.song_details}>
             <center>
              <span>{music.name}</span>
              </center>
              <p>{music.artista}</p>
          </div>
          <div id='area' onClick={(e)=> setWidth(clickWidth(e.clientX, audio))} className={styles.progress_area}> {/*click ghjcvhnvkhvhk */}
              <div style={{width: width}} className={styles.progress_bar}>

              </div>
              <div className={styles.time}>
                  <span > {currentTime}</span>
                  <span >{AudioDuration} </span>
              </div>
          </div>
        
          <div className={styles.controls}>
              <i id="repeat" onClick={() => mod()} className="material-symbols-outlined" title="Repetição de playlist ativada" >
                {cssRep}
              </i>
              <i id="prev" onClick={() => prev()} className='bx bx-skip-previous-circle'></i>
              <div className={styles.play} onClick={() => setPlay(!play)} >
                      {play ? (
                      <i  className=' vortano bx bx-pause-circle'></i>) : (
                          <i className=' indu bx bx-play-circle'></i>)}
                  </div>
              <i id="next" onClick={() => next()} className='bx bx-skip-next-circle'></i>
              <i id="more" className='bx bxs-playlist' onClick={() => setShow(!show)}></i>
          </div>
          <div className={css}>
            <div className={styles.header}>
                <div className={styles.row}>
                    <i id="more" className='bx bxs-playlist'></i>
                    <span>Lista de Musicas</span>
                </div>
                    <i onClick={() => setShow(!show)} id="close" className='bx bx-x'></i>
            </div>
            <ul>
                {Allmusic.map((musc) => (
                    <li className={styles.roww} key={musc.name} onClick={() => playList(musc.id)} >
                    <div >
                        <span>{musc.name}</span>
                        <p>{musc.artista}</p>
                    </div>
                    <span id="" className={styles.audio_duration}>
                        {music.id=== musc.id && (<p>Tocando agora</p>)}
                        
                        {music.id!== musc.id && (
                        
                        <p>{getDuration(musc.audio.duration)}</p>
                        )}
                    </span>
                </li>
                ))}
            
            </ul>
        </div>
          
        </div>
    </div>
  )
}

export default Player