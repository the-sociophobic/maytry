const YANDEX_METRICA_ID = 95223283


export type yandexGoalProps = {
  goalId: number
  order_price?: number
}


const yandexGoal = ({
  goalId,
  order_price,
}: yandexGoalProps) => {
  const { ym } = window

  console.log(ym?.(YANDEX_METRICA_ID, 'reachGoal', goalId))
}


export default yandexGoal
