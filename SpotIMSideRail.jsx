class SpotIMSideRail extends React.Component {
  constructor() {
    super();
    this.container = null;
  }
  componentDidMount() {
    if (!this.container) {
      console.warn('SpotIMSideRail: missing container');
      return;
    }
    if (!this.props.spotId) {
      console.warn('SpotIMSideRail: missing Spot ID');
      return;
    }
    if (!window || !window.document) {
      console.warn('SpotIMSideRail: this component supports client only');
      return;
    }
    this.initSideRail();
  }
  initSideRail() {
    var {spotId} = this.props;
    var script = document.createElement('script');
    script.setAttribute('async', 'async');
    script.setAttribute('src', 'https://mc-siderail.spot.im/spot/' + spotId);
    script.setAttribute('data-spotim-script', 'siderail');
    this.container.appendChild(script);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div ref={el => (this.container = el)}>
        <div data-spotim-module="siderail" data-spot-id={this.props.spotId} />
      </div>
    );
  }
}
