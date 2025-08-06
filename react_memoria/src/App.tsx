import { useEffect, useState } from 'react'
import * as C from './App.styles'

import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'

import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import { GridItem } from './components/GridItem'

import type { GridItemType } from './types/GridItemType'
import { items } from './data/items' 
import { formatTime } from './helpers/formatTime'


const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElaspsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElaspsed + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElaspsed])

  const resetAndCreateGrid = () => {
    //Passo 1 - resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)

    //Passo 2 - criar grid vazio
    let tempGrid: GridItemType[] = []

    for(let i = 0; i < items.length*2; i++) {
      tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }
    //Passo 3 - Preencher grid
    for (let w = 0; w < 2; w++) {
      for (let y = 0; y < items.length; y++){
        let pos = -1
        while (pos < 0 || tempGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length*2))
        }
        tempGrid[pos].item = y
      }
    }
    //Passo 4 - Jogar no state

    setGridItems(tempGrid)

    //Passo 5 - Iniciar jogo

    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItems];

      if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
        tempGrid[index].shown = true
        setShownCount(shownCount + 1)
      }

      setGridItems(tempGrid)
    }
  }


  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
         <InfoItem label='Tempo' value={formatTime(timeElaspsed)}></InfoItem>
         <InfoItem label='Movimentos' value='0'></InfoItem>
        </C.InfoArea>

        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
      </C.Info>
      
      <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index)=>(
              <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
              />
            ))}

          </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App;