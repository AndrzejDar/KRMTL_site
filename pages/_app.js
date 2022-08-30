import Layout from '../components/Layout'
//Bootstrap styles import
// import "bootstrap/dist/css/bootstrap.css"
//Global css import
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className='app'>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </div>
  )
}

export default MyApp
