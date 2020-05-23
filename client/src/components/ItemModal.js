import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import axios from 'axios';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const name = this.state.name.replace(" ", "%20");
        const url = `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=uqXZu7wXziL89doiBnoz0yUFShlmZY4rnvn4VMHWx0s&orientation=landscape`;

        axios.get(url)
        .then(res => {
            const { results } = res.data;
            const newItem = {
                name: this.state.name,
                pic: results[0].urls.small
            }

            console.log(newItem);

            // Add item via addItem action
            this.props.addItem(newItem);

            // Close modal
            this.toggle();
        });
    }

    render() {
        return (
            <div>
                { this.props.isAuthenticated ? <Button
                    color="dark"
                    className="mb-2"
                    onClick={this.toggle}
                >
                    Add Item
                </Button> : <h4 className="mb-3 ml-4">Please login to manage items</h4>}
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    className="mt-4"
                                    block
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal)
