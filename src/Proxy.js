
import React from 'react'

/*
 * Proxy works as a virtual svg node.
 * @select: The css selector of the element
 * @ref: callback in case the svg node is needed
 * @children : string supported (for text elements
 */
export default class Proxy extends React.Component {
  static propTypes = {
    select: React.PropTypes.string.isRequired,
    svg: React.PropTypes.object,
    ref: React.PropTypes.func,
    children: React.PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.state = {
      elemRefs: null
    }
  }

  componentWillReceiveProps (nextProps) {
    var elems = this.state.elemRefs || [] 
    if (nextProps.svg && elems.length === 0) {
      //We don't have the svg element reference.
      var nodes = [].slice.call(nextProps.svg.querySelectorAll(this.props.select))
      // Call the ref callback with the element (or array)
      if (this.props.ref && nodes.length > 0) {
        this.props.ref(nodes.length === 1 ? nodes[0] : nodes)
      }
      
      elems = nodes
      this.setState({elemRefs: nodes })
    }

    if (elems) {
      const pnames = Object.keys(nextProps)
      for (var i = 0; i < pnames.length; i++) {
        /* The proxy received properties, apply them to the svg element */
        const propName = pnames[i]
        elems.forEach((elem) => {
            // TODO: replace this with a faster alternative
          if (typeof nextProps[propName] === 'function') {
            elem[propName] = nextProps[propName]
          } else {
            elem.setAttribute(propName, nextProps[propName])
            if (this.props.children && typeof this.props.children === 'string') {
              elem.innerHTML = this.props.children
            }
          }
        })
      }
    }
  }

  render () {
    return null
  }
}

Proxy.defaultProps = {
  ref: () => {}
}
