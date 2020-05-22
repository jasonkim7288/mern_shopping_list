import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
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
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name}) => (
                            <CSSTransition timeout={500} key={_id} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ? <Button
                                        className="mr-2"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;
                                    </Button> : null }
                                    
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
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
