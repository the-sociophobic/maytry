import countable from '.'


const hours = (number: number) =>
  countable(number, ['час', 'часа', 'часов'])


export default hours
