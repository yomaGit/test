import Header from './Header'

const style={
    margin:'20px',
    padding:'20px',
    border:'1px solid red'
}
const layout=(props)=>(
    <div style={style}>
        <Header></Header>
        {props.children}
    </div>
)
export default layout;