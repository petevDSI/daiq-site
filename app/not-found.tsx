import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section center">
      <div className="narrow">
        <h1>That page is not here</h1>
        <p className="lede">It may have moved. Try the blog or head back home.</p>
        <div className="btn-row">
          <Link className="btn btn-navy" href="/blog">
            Browse the blog
          </Link>
          <Link className="btn btn-outline" href="/">
            Home
          </Link>
        </div>
      </div>
    </section>
  )
}
