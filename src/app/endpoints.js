import axios from 'axios';


function get_data(){
    var i;
    var articles =[];
    for (i = 1; i < 6; i++) {
      axios.get('assets/article-' + i + '.json',  { crossdomain: true }).then(response => {articles.push({"data":response.data, "id":i})});
  };
    return articles;
}

export default get_data;
