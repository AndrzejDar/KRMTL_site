import {useRouter} from 'next/router'
import Link from 'next/link'

const article = ({article: {data: {attributes, id}}}) => {
    // const router = useRouter()
    // console.log(router)
    // const {id} = router.query

    console.log(attributes);

  return (
    <>
    <div>temporary article number {id} </div>
    <div>{attributes.title}</div>
    </>
  )
}


export const getServerSideProps = async (context) =>{
    const res = await fetch(`http://localhost:1337/api/articles/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
    }
}

export default article