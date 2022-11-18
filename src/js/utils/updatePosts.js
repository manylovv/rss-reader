import axios from 'axios';
import _ from 'lodash';
import parseRSS from './parseRSS';

const proxyUrl =
  'https://hexlet-allorigins.herokuapp.com/raw?disableCache=true&url=';

const updatePosts = (state) => {
  const promises = state.feeds.map((feed) => {
    return axios
      .get(proxyUrl + feed.url)
      .then((response) => {
        const { posts } = parseRSS(response.data);
        const newPosts = _.differenceBy(posts, state.posts, 'link');
        state.posts.unshift(...newPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  Promise.all(promises).finally(() => setTimeout(updatePosts, 5000, state));
};

export default updatePosts;
