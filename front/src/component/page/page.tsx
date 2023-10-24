import './style.scss'

type PagePropr = {
  children: React.ReactNode
}

const Page: React.FC<PagePropr> = ({ children }) => {
  return (
    <section className='page'>
      <div className='page__content'>{children}</div>
    </section>
  )
}

export default Page
