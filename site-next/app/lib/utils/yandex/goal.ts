import { YANDEX_METRICA_ID } from './consts'


export type yandexGoalProps = {
  goalId: string
  order_price?: number
}


const yandexGoal = ({
  goalId,
  order_price: _order_price,
}: yandexGoalProps) => {
  const { ym } = window

  if (ym) {
    ym(YANDEX_METRICA_ID, 'reachGoal', goalId)
    console.log(`Яндекс Метрика ${goalId}`)
  }
}


export default yandexGoal
