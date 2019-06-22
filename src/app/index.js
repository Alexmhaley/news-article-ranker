import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import get_data from "endpoints.js";
// var get_data = require('./endpoints.js');




class CardList extends React.Component{
    render() {
        const rows = [];
        var articles = this.props.articles;
        console.log(">>>>>>>>>>>>>>>>>>>>>>");
        console.log(articles);
        console.log(articles.length);
        console.log(articles[1]);
        console.log("(000000000000000000000)");
        console.log(Array.isArray(articles));
        for (var article in articles){
            console.log(articles[article]);
            // rows.push(<NewsCard news_article={article} />)
        };

        console.log("*******************");
        return(
          <table>
            <thead>
              <tr>
                <th>News Articles</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        )
    }
}

class NewsCard extends React.Component {
  render() {
      const article = this.props.news_article;
      console.log("))))))))))))))))))))))))))))");
      console.log(article);
      const title = article.title;
      const ranking = 0;
    return (
      <div className="card">
        <div id="info">
            <h1>{title}</h1>
            <p>{ranking}</p>
        </div>
      </div>
    );
  }
}



function get_data(){
    var i;
    var articles_promise =[];
    var articles=[];
    for (i = 1; i < 6; i++) {
      articles_promise.push(axios.get('assets/article-' + i + '.json',  { crossdomain: true }).then(response => {return response.data}));
  };
  Promise.all(articles_promise).then(res => {
    articles.push(res);
    });
  console.log("&&&&&&&&&&&&&&&&&&&&&");
  console.log(JSON.stringify(articles));
    return articles;
}

ReactDOM.render(
    <CardList articles={get_data()}/>,
  document.getElementById('container')
);
//articles.push({"data":response.data, "id":i})
