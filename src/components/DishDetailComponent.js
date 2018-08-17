import React, {Component} from 'react';
import {Button, Row, Col, Modal, ModalHeader, ModalBody, Label, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCommentModalOpen: false
        };
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
    }

    toggleCommentModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State of comment form is: ' + JSON.stringify(values));
        alert('Current State of comment form is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleCommentModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                                    className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      rows="6"
                                                      className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 12}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div className="col-12 col-md-5 m-1"></div>
        );
    }
}

function RenderComments({comments}) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => (
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
                <CommentForm/>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                </div>
            </div>
        );
    }
}


export default DishDetail;