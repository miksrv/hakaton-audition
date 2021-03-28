import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Footer from '../layouts/Footer'

import * as backActions from '../store/back/actions'

import _ from 'lodash'

class MainContainer extends Component {
    render() {
        const { children } = this.props

        return (
            <>
                <Container className='header'>
                    <div><b>Sell-us</b></div>
                    <div>Специально для Audition</div>
                </Container>
                {children}
                <Footer />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(MainContainer)