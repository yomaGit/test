import React, {Component} from 'react'

class Link extends Component {

    render() {
        let active = this.props.active;
        let children = this.props.children;
        let onClick = this.props.onClick;
        if (active) {
            return <span>{children}</span>
        } else {
            return (
                <a href="" onClick={e => {
                    e.preventDefault()
                    onClick()
                }}>
                    {children}
                </a>
            )
        }
    }

}

export default Link