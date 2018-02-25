class SpotIMConversation extends React.Component {
  static displayName = 'SpotIMConversation';
  static defaultProps = {
    messagesCount: null,
    enableSeo: false,
    articleTags: '',
  };
  constructor() {
    super();
    this.container = null;
  }
  componentDidMount() {
    this.initConversation(this.props);
  }
  initConversation(props) {
    var {
      spotId,
      postId,
      canonicalUrl,
      disqusIdentifier,
      disqusUrl,
      enableSeo,
      messagesCount,
      articleTags,
    } = props;
    if (!this.container) {
      console.warn('SpotIMConversation: missing container');
      return;
    }
    if (!props.spotId) {
      console.warn('SpotIMConversation: missing Spot ID');
      return;
    }
    if (!props.postId) {
      console.warn('SpotIMConversation: missing Post ID');
      return;
    }
    if (!window || !window.document) {
      console.warn('SpotIMConversation: this component supports client only');
      return;
    }
    if (!canonicalUrl) {
      canonicalUrl = window.location.href;
    }
    var launcherScript = document.createElement('script');
    launcherScript.setAttribute('async', 'async');
    launcherScript.setAttribute(
      'src',
      'https://launcher.spot.im/spot/' + spotId
    );
    launcherScript.setAttribute('data-spotim-module', 'spotim-launcher');
    launcherScript.setAttribute('data-post-id', postId);
    launcherScript.setAttribute('data-post-url', canonicalUrl);
    launcherScript.setAttribute('data-facebook-url', canonicalUrl);
    if (disqusIdentifier) {
      launcherScript.setAttribute('data-disqus-identifier', disqusIdentifier);
    }
    if (disqusUrl) {
      launcherScript.setAttribute('data-disqus-url', disqusUrl);
    }
    if (enableSeo) {
      launcherScript.setAttribute('data-seo-enabled', enableSeo);
    }
    if (messagesCount) {
      launcherScript.setAttribute('data-messages-count', messagesCount);
    }
    if (articleTags) {
      launcherScript.setAttribute('data-article-tags', articleTags);
    }
    this.container.appendChild(launcherScript);
  }
  destroyConversation() {
    if (!this.container) {
      console.warn('SpotIMConversation: missing container');
      return false;
    }
    this.container.innerHTML = '';
    return true;
  }
  componentWillReceiveProps(nextProps) {
    var { spotId: currentSpotId, postId: currentPostId } = this.props;
    var { spotId: nextSpotId, postId: nextPostId } = nextProps;
    if (currentSpotId !== nextSpotId || currentPostId !== nextPostId) {
      var destroyed = this.destroyConversation();
      if (destroyed) {
        this.initConversation(nextProps);
      }
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <div ref={el => (this.container = el)} />;
  }
}
