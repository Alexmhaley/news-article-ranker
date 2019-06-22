import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardColumns from 'react-bootstrap/CardColumns'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


var get_data = require('./endpoints.js');

class NewsCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          article_id:this.props.article_id    //show the first article as default
        }
      }

  render() {
      const article = this.props.news_article;
      const excerpt = article.excerpt;
      console.log(article);
      const ranking = 0;
    return (
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>
              {ranking}
            </Card.Text>
            <Button variant="primary" onClick={() => this.props.update_article(this.state.article_id)}>View article</Button>
          </Card.Body>
        </Card>
    );
  }
}


class CardList extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
          selected_article: 0   //show the first article as default
        }
        this.update_article  = this.update_article.bind(this);
      }

      update_article(selected_article) {
                this.setState({selected_article:selected_article});
                console.log("Set STATE");
          }
    render() {
        const rows = [];
        var i = 0;
        this.props.articles.forEach((article) => {
            rows.push(<NewsCard news_article={article} article_id={i} update_article={this.update_article}/>);
            i += 1;
        });
        return(
        <Container fluid="true">
            <Row>
                <Col>
                    <ArticleDetails article_id={this.state.selected_article}/>
                </Col>
                <Col>
                    <CardColumns>
                             {rows}
                    </CardColumns>
              </Col>
          </Row>
      </Container>
        )
    }
}

class ArticleDetails extends React.Component{
    constructor(props) {
        super(props)

        this.state = {}
      }
    render(){
        const article = get_data()[this.props.article_id];
        const details = [];

        return(
            <div className="article_details">
            <Card style={{ width: '60%' }}>
            <Card.Body>
                <Card.Title>{article['title']}</Card.Title>
                {article['body'].map(function(element){
                    switch (element['type']){
                        case "paragraph":
                            console.log(element['model']);
                            return(
                                <Card.Text> {element['model']['text']} </Card.Text>
                            )
                        case "heading":
                            return(
                                <Card.Subtitle> {element['model']['text']}</Card.Subtitle>
                            )
                        case "image":
                            return(
                                <Card.Img src={element['model']['url']} alt={element['altText']} width={element['model']['width']} height={element['model']['height']}></Card.Img>
                            )
                        case "list":
                            return(
                                <Card.Text> {element['model']['items'][0]}</Card.Text>
                            )
                    }
                })}
            </Card.Body>
            </Card>
        </div>
        )
    }
}


ReactDOM.render(
    <CardList articles={get_data()}/>,
  document.getElementById('container')
);
