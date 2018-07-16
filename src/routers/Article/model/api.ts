import axios from 'axios';
class ArticleApi {
  async get_article_list(page = 0) {
    try {
      const url = '//127.0.0.1:7001/article';
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
      const url = '//127.0.0.1:7001/article/add';
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