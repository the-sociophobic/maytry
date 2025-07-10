const isProd = () =>
  import.meta.env.MODE !== 'development'


export default isProd