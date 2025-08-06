import type { GridItemType } from '../../types/GridItemType'
import * as C from './styles'
import brain from '../../svgs/brain.svg'
import { items } from '../../data/items'

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container
            showBackground={item.permanentShown || item.shown}
            onClick={onClick}
        >
            {item.permanentShown === false && item.shown === false &&
                <C.Icon src={brain} alt="" opacity={0.2}/>
            }
            {(item.permanentShown === true || item.shown === true) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt=''/>

            }
        </C.Container>
    )
}