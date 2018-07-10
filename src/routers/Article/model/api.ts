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
  add_article(article_info) {
    console.log(article_info);
  }
}

export default new ArticleApi();