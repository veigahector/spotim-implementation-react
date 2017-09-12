class SpotIMPopularInTheCommunity extends React.Component {
	constructor() {
		super();
		this.container = null;
	}
	componentDidMount() {
		if (!this.container) {
			console.warn('SpotIMPopularInTheCommunity: missing container');
			return;
		}
		if (!this.props.spotId) {
			console.warn('SpotIMPopularInTheCommunity: missing Spot ID');
			return;
		}
		if (!window || !window.document) {
			console.warn('SpotIMConversation: this component supports client only');
			return;
		}
		this.initPopularInTheCommunity();
	}
	initPopularInTheCommunity() {
		var { spotId } = this.props;
		var script = document.createElement('script');
		script.setAttribute('async', 'async');
		script.setAttribute('src', 'https://recirculation.spot.im/spot/' + spotId);
		this.container.appendChild(script);
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<div ref={ el => this.container = el }>
				<div data-spotim-module="recirculation" data-spot-id={ this.props.spotId }></div>
			</div>
		);
	}
}
