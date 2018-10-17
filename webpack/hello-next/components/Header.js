import Link from 'next/link'

const style = {
    marginRight: '15px'
}
const Header = () => (
    <div>
        <Link href="/">
            <a href="javascript:;" style={style}>index</a>
        </Link>
        <Link href="/about">
            <a href="javascript:;" style={style}>about</a>
        </Link>
    </div>
)

export default Header;
