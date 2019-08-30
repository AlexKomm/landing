import React from 'react';
import { Box } from 'rebass';

class YaShare extends React.Component {
  componentDidMount() {
    window.Ya.share2('ya-share', {
      theme: { services: 'vkontakte,facebook,odnoklassniki,gplus' },
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Box {...this.props}>
        <script src="//yastatic.net/share2/share.js" charSet="utf-8" />
        <div id="ya-share" />
      </Box>
    );
  }
}
export default YaShare;
