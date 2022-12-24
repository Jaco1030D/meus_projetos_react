import Allmusic from '../dados/Allmusic'

export const useGetMusic = (index) => {
  const music = {
      id: Allmusic[index-1].id,
      name: Allmusic[index-1].name,
      artista: Allmusic[index-1].artista,
      img: Allmusic[index-1].img,
      src: Allmusic[index-1].src,
      letra: Allmusic[index-1].letra, 
  }
  return {music}
}
