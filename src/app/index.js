import React from 'react';
import ReactDOM from 'react-dom';

var get_data = require('./endpoints.js');

class NewsCard extends React.Component {
  render() {
      const article = this.props.news_article;
      const excerpt = article.excerpt;
      console.log(article);
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


class CardList extends React.Component{
    render() {
        const rows = []
        this.props.articles.forEach((article) => {
            rows.push(<NewsCard news_article={article} />)
        });
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


ReactDOM.render(
    <CardList articles={get_data()}/>,
  document.getElementById('container')
);
