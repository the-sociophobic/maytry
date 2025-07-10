const isExternalLink = (url: string) =>
  url.match(/http*|tel:*|mailto:*|#[a-zA-Z0-9]+/)


export default isExternalLink
