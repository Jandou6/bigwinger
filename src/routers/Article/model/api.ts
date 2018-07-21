import axios from 'axios';
import CONFIG from '../../../config';
class ArticleApi {
  async get_article_list(page = 0) {
    try {
      const url = `//${CONFIG.host}:${CONFIG.port}/article`;
      const responce = await axios.get(url, {
        params: {
          page,
        },
      });
      return responce.data;
    } catch (e) {
      console.info(e);
    }
  }
 async add_article(article_info) {
    try {
      const url = `//{CONFIG.host}:${CONFIG.port}/article/add`;
      const responce = await axios.post(url, {
        data: article_info,
      });
      return responce.data;
    } catch (e) {
      console.info(e);
    }
  }

}

export default new ArticleApi();