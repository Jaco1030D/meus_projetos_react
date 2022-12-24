export const useInfoMusic = () => {
    const getDuration = (duration) =>{
        let audiodec = duration
        let min = Math.floor(audiodec / 60)
        let sec = Math.floor(audiodec % 60)
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return (`${min}:${sec}`)
    }
    const clickWidth = (click, audio) =>{
        let width = document.getElementById('area')
        let widthClick = width.clientWidth
        let widthDiv = width.offsetLeft
        let aD = audio.duration
        let resultWidth = (click-widthDiv)
        audio.currentTime= (resultWidth/widthClick) * aD
        return `${resultWidth}px`
    } 
  return {getDuration, clickWidth}
}
