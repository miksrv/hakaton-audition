import * as types from './actionTypes'

export function getData(start, region, amount, word) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    start: start,
                    region: region,
                    amount: amount,
                    word: word
                })
            })

            const payload = await response.json()

            dispatch({ type: types.GET_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getByID(id) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}share.php?code=${id}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function clearData() {
    return async(dispatch) => {
        await dispatch({type: types.CLEAR_DATA})
    }
}