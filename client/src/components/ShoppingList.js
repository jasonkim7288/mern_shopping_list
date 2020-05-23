import React, { Component } from 'react'
import { Container, CardGroup, Card, CardImg, Button, CardBody, CardTitle, CardDeck, CardColumns } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        deleteItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <TransitionGroup className="shopping-list">
                <CardDeck>

                        {items.map(({ _id, name, pic}) => (
                            <CSSTransition timeout={500} key={_id} classNames="fade">
                                <Card className="mb-4" style={{minWidth: "334px", maxWidth: "334px"}} >
                                    <CardImg top style={{width: "332px", height: "160px", objectFit: "cover"}} src={pic} alt = "Image" />
                                    <CardBody >
                                        <CardTitle style={{fontSize:"2rem"}}>
                                            {name}
                                        </CardTitle>
                                        { this.props.isAuthenticated ? <Button
                                            color="danger"
                                            size="sl"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                            block
                                        >Delete
                                        </Button> : null }
                                    </CardBody>
                                </Card>
                            </CSSTransition>
                        ))}

                </CardDeck>
                </TransitionGroup>                
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

const mapActionsToProps = {
    getItems,
    deleteItem
}

export default connect(mapStateToProps, mapActionsToProps)(ShoppingList);
