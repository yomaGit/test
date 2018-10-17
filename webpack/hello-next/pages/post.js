import Layout from '../components/MyLayout'

const post=(props)=>(
    <Layout>
        <h1>{props.url.query.title}</h1>
        <p>This is the blog post content.</p>
    </Layout>
)
export default post;