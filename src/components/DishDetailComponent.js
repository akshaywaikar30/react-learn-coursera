import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class Dishdetail extends Component {

    componentDidMount(){
        console.log("Dishdetail component did mount");
    }

    componentDidUpdate(){
        console.log("Dishdetail component did update");
    }

    renderDish(dish){
        console.log("Dishdetail component rendered");
        if(dish!=null){
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }else {
            return (
                <div className="col-12 col-md-5 m-1"></div>
            );
        }
    }

    renderComments(dish) {
        if (dish != null) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {dish.comments.map((comment) => (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {
                                    new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric', month: 'short', day: '2-digit'
                                    }).format(new Date(Date.parse(comment.date)))
                                    }
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return(
                <div></div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }

}

export default Dishdetail;