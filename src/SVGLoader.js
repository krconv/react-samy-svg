import React from 'react'
import ReactSVG from 'react-svg'

/* Just a wrapper around ReactSVG to disable re rendering it */
export default class SVGLoader extends React.Component {
  static propTypes = {
    path: React.PropTypes.string.isRequired,
    onSVGReady: React.PropTypes.fun
  }

  constructor (props) {
    super(props)
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.path !== this.props.path) {
      return true
    }

    return false
  }

  render () {
    return (

      <ReactSVG style={this.props.style || {}} path={this.props.path} callback={this.props.onSVGReady} />
    )
  }
}

