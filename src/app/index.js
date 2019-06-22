import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardColumns from 'react-bootstrap/CardColumns'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Rating from 'react-rating';
var get_data = require('./endpoints.js');

class NewsCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          article_id:this.props.article_id,    //show the first article as default
          rating:this.get_user_rating(this.props.article_id)
        }
      }

    update_rating(value){
        //This would actually be a call to the server to set the rating on the
        //article based on the article id and the user id so their preferences
        //could be saved between sessions as well as setting it in the state
        this.setState({rating:value});
    }

    get_user_rating(article_id){
        //Would be an api get call to the server to get the user's rating based on the
        //article id and using the current user's id
        //Returns a random starting value to replicate a user already having rated some articles
        return Math.floor(Math.random() * 5);
    }

  render() {
      const article = this.props.news_article;
      const excerpt = article.excerpt;
      console.log(article);
    return (
        <Row>
          <Card className="p-3">
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Rating onClick={(rate) => this.update_rating(rate)} initialRating={this.state.rating}/>
            <Button variant="primary" onClick={() => this.props.update_article(this.state.article_id)}>View article</Button>
          </Card.Body>
        </Card>
        </Row>
    );
  }
}


class CardList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          selected_article: 0   //show the first article as default
        }
        this.update_article = this.update_article.bind(this);
      }

     update_article(selected_article) {
        this.setState({selected_article:selected_article});
    }
    render() {
        const rows = [];
        var i = 0;
        this.props.articles.forEach((article) => {
            rows.push(<NewsCard news_article={article} article_id={i} update_article={this.update_article}/>);
            i += 1;
        });
        return(
        <Container>
            <Row>
                <Col sm={3}>
                {rows}
              </Col>
              <Col sm={9}>
                  <ArticleDetails article_id={this.state.selected_article}/>
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
        const article = get_data(this.props.article_id);
        const details = [];

        return(
            <div className="article_details">
            <Card style={{ width: '100%' }}>
            <Card.Body>
                <h3>{article['title']}</h3>
                <p></p>
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
                                <Card.Img src={element['model']['url']} alt={element['altText']} width={element['model']['width']} height={element['model']['height']} padding-bottom='40px' padding-top='40px'></Card.Img>
                            )
                        case "list":
                            var list_items = [];
                            element['model']['items'].forEach((list_item) => {
                                list_items.push(<ListGroup.Item>{list_item}</ListGroup.Item>);
                            });

                            return(
                                <ListGroup variant="flush">
                                {list_items}
                              </ListGroup>
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
