import Layout from '../components/MyLayout'
import Link from 'next/link'

const Postlink=(props)=>(
    <li>
        <Link href={`/post?title=${props.title}`}>
            {props.title}
        </Link>
    </li>
)

const Index = (props) => (
    <Layout>
        <h1>my blob</h1>
        <ul>
            <Postlink title="Hello next.js"></Postlink>
            <Postlink title="learning next.js"></Postlink>
            <Postlink title="next.js test"></Postlink>
            getInitialProps测试{props.shows.test}
        </ul>
    </Layout>
)

Index.getInitialProps=async function(){
    return {
        shows: {
            test:'12345'
        }
    }
}

export default Index