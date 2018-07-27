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
      const url = `//${CONFIG.host}:${CONFIG.port}/article/add`;
      const responce = await axios.post(url, {
        data: article_info,
      });
      return responce.data;
    } catch (e) {
      console.info(e);
    }
  }

  async get_article_by_id(id:number) {
    try {
      const url = `//${CONFIG.host}:${CONFIG.port}/article/get`;
      const responce = await axios.get(url, {
        params: {
          id,
        },
      });
      return responce.data;
    } catch (e) {
      console.log(e);
    }
  }

  async update_article(article_info) {
    try {
      const url = `//${CONFIG.host}:${CONFIG.port}/article/update`;
      const responce = await axios.post(url, {
        data: article_info,
      });
      return responce.data;
    } catch (e) {
      console.log(e);
    }
  }

}

export default new ArticleApi();