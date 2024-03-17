import React, { Component } from 'react'
import styled from 'styled-components';
import ee from 'event-emitter';

const Container = styled.div`
    background-color: ${props => props.type.backColor};
    color: ${props => props.type.textColor};
    padding: 10px 20px;
    position: absolute;
    top: ${props => props.top}px;
    opacity: ${props => props.opacity};
    left: 50%;
    transform: translate(-50%);
    border-radius: 5px;
    border: 1px solid ${props => props.type.borderColor};
    z-index: 999;
    transition: all 0.5s ease;
`;

const emitter = new ee();

export const notify = (msg, type = 'info') => {
    emitter.emit('notification', msg, type);
}

const types = {
    warning: {borderColor: '#DD1C1A', textColor: '#DD1C1A', backColor: '#EED2CC'},
    info: {borderColor: '#6B818C', textColor: '#6B818C', backColor: '#D8E4FF'},
    success: {borderColor: '#57A773', textColor: '#57A773', backColor: '#A2E1CA'}
}

export class Notification extends Component {
    constructor(props){
        super(props);

        this.state = {
            top: -100,
            msg: '',
            opacity: 0,
            type: 'info'
        };

        this.timeout = null;

        emitter.on('notification', (msg, type) => {
            this.onShow(msg, type);
        });
    }

    onShow = (msg, type) => {
        if (this.timeout){
            clearTimeout(this.timeout);
            this.setState({ top: -100, opacity: 0}, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification(msg, type);
                }, 500);
            });
        }else{
            this.showNotification(msg, type);
        }
    }

    showNotification = (msg, type) => {
        this.setState({
            top: 100,
            opacity: 1,
            msg,
            type
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -100,
                    opacity: 0
                });
            }, 3000)
        });
    }

    render() {
        return (
            <Container type={types[this.state.type] || types['info']} opacity={this.state.opacity} top={this.state.top}>{this.state.msg}</Container>
        )
    }
}

export default Notification
