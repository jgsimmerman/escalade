import React from 'react'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = { loading: false }
		this.hideLoader = this.hideLoader.bind(this)
		this.showLoader = this.showLoader.bind(this)
		this.startTimeout = this.startTimeout.bind(this)
	}
	componentWillReceiveProps() {
		this.startTimeout()
	}
	componentDidMount() {
		if (this.img.complete) {
			this.hideLoader()
		}
		else {
			this.startTimeout()
		}
	}
	startTimeout() {
		clearTimeout(this.timeout)
		this.timeout = setTimeout(this.showLoader, 100)
	}
	showLoader() {
		if (!this.img.complete) {
			this.setState({ loading: true })
		}
	}
	hideLoader() {
		clearTimeout(this.timeout)
		this.setState({ loading: false })
	}
	render(){
		return (
			<div className='root' style={{
				maxWidth: this.props.width,
				maxHeight: this.props.height,
				margin: this.props.center ? 'auto' : ''
			}}>
				<div style={{
					position: 'relative',
					paddingBottom: `${(this.props.height / this.props.width) * 100}%`
				}}>
					<img
						src={this.props.src}
						srcSet={this.props.srcSet}
						ref={img => this.img = img}
						onLoad={this.hideLoader}
						onError={this.hideLoader}
						alt={this.props.alt}
						style={{
							position: 'absolute',
							width: '100%',
							maxWidth: '100%',
							top: '0',
							left: '0',
							display: this.state.loading ? 'none' : ''
						}}
					/>
					{this.state.loading && this.props.loading &&
						<div className='loader' style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)'
							}}>
							{this.props.loading}
						</div>
					}
				</div>
			</div>
		)
	}
}
