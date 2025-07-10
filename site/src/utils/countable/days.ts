import countable from '.'


const days = (number: number) =>
  countable(number, ['день', 'дня', 'дней'])


export default days
