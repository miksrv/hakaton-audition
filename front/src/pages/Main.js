import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Select, Button, Message, Header, Grid, Dimmer, Loader, Icon } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'

import moment from 'moment'

import MainContainer from '../components/MainContainer'

import * as backActions from '../store/back/actions'

import _ from 'lodash'

const genderOptions = [
    { key: 1, text: 'Медицина', value: 'Медицина' },
    { key: 2, text: 'Информационные технологии (IT)', value: 'IT' },
    { key: 3, text: 'Производство', value: 'Производство' },
    { key: 4, text: 'Логистика', value: 'Логистика' },
    { key: 5, text: 'Продажи', value: 'Продажи' },
    { key: 6, text: 'Образование', value: 'Образование' },
    { key: 7, text: 'Научная деятельность', value: 'Научная деятельность' },
    { key: 8, text: 'Строительство', value: 'Строительство' },
    { key: 9, text: 'Культура', value: 'Культура' },
    { key: 10, text: 'Гос. Служащий', value: 'Гос. Служащий' },
    { key: 11, text: 'Сельское хозяйство', value: 'Сельское хозяйство' },
    { key: 12, text: 'Добыча и переработка', value: 'Добыча и переработка' },
    { key: 13, text: 'Энергетика', value: 'Энергетика' },
    { key: 14, text: 'Ремонт цифровой техники', value: 'Ремонт цифровой техники' },
    { key: 15, text: 'Автосервис', value: 'Автосервис' },
    { key: 16, text: 'Красота и здоровье', value: 'Красота и здоровье' },
    { key: 17, text: 'Мебель и интерьер', value: 'Мебель и интерьер' },
    { key: 18, text: 'Другое', value: 'Другое' }
]
const regionOptions = [
    { key: 1, text: 'Алтайский край', value: 22 },
    { key: 2, text: 'Амурская область', value: 28 },
    { key: 3, text: 'Архангельская область', value: 29 },
    { key: 4, text: 'Астраханская область', value: 30 },
    { key: 5, text: 'Брянская область', value: 32 },
    { key: 6, text: 'Владимирская область', value: 33 },
    { key: 7, text: 'Волгоградская область', value: 34 },
    { key: 8, text: 'Вологодская область', value: 35 },
    { key: 9, text: 'Воронежская область', value: 36 },
    { key: 10, text: 'г. Москва', value: 77 },
    { key: 11, text: 'Еврейская автономная область', value: 79 },
    { key: 12, text: 'Забайкальский край', value: 75 },
    { key: 13, text: 'Ивановская область', value: 77 },
    { key: 14, text: 'Иные территории, включая город и космодром Байконур', value:99 },
    { key: 15, text: 'Иркутская область', value: 38 },
    { key: 16, text: 'Кабардино-Балкарская Республика', value: 7 },
    { key: 17, text: 'Калининградская область', value: 39 },
    { key: 18, text: 'Калужская область', value: 40 },
    { key: 19, text: 'Камчатский край', value: 41 },
    { key: 20, text: 'Карачаево-Черкесская Республика', value: 9 },
    { key: 21, text: 'Кемеровская область - Кузбасс', value: 42 },
    { key: 22, text: 'Кировская область', value: 43 },
    { key: 23, text: 'Костромская область', value: 44 },
    { key: 24, text: 'Краснодарский край', value: 23 },
    { key: 25, text: 'Красноярский край', value: 24 },
    { key: 26, text: 'Курганская область', value: 45 },
    { key: 27, text: 'Курская область', value: 46 },
    { key: 28, text: 'Ленинградская область', value: 47 },
    { key: 29, text: 'Липецкая область', value: 48 },
    { key: 30, text: 'Магаданская область', value: 49 },
    { key: 31, text: 'Московская область', value: 50 },
    { key: 32, text: 'Мурманская область', value: 51 },
    { key: 33, text: 'Ненецкий автономный округ', value: 83 },
    { key: 34, text: 'Нижегородская область', value: 52 },
    { key: 35, text: 'Новгородская область', value: 53 },
    { key: 36, text: 'Новосибирская область', value: 54 },
    { key: 37, text: 'Омская область', value: 55 },
    { key: 38, text: 'Оренбургская область', value: 56 },
    { key: 39, text: 'Орловская область', value: 57 },
    { key: 40, text: 'Пензенская область', value: 58 },
    { key: 41, text: 'Пермский край', value: 59 },
    { key: 42, text: 'Приморский край', value: 25 },
    { key: 43, text: 'Псковская область', value: 60 },
    { key: 44, text: 'Республика Адыгея', value: 1 },
    { key: 45, text: 'Республика Алтай', value: 4 },
    { key: 46, text: 'Республика Башкортостан', value: 2 },
    { key: 47, text: 'Республика Бурятия', value: 3 },
    { key: 48, text: 'Республика Дагестан', value: 5 },
    { key: 49, text: 'Республика Ингушетия', value: 6 },
    { key: 50, text: 'Республика Калмыкия', value: 8 },
    { key: 51, text: 'Республика Карелия', value: 10 },
    { key: 52, text: 'Республика Коми', value: 11 },
    { key: 53, text: 'Республика Крым', value: 91 },
    { key: 54, text: 'Республика Марий Эл', value: 12 },
    { key: 55, text: 'Республика Мордовия', value: 13 },
    { key: 56, text: 'Республика Саха (Якутия)', value: 14 },
    { key: 57, text: 'Республика Северная Осетия - Алания', value: 15 },
    { key: 58, text: 'Республика Татарстан (Татарстан)', value: 16 },
    { key: 59, text: 'Республика Тыва', value: 17 },
    { key: 60, text: 'Республика Хакасия', value: 19 },
    { key: 61, text: 'Ростовская область', value: 61 },
    { key: 62, text: 'Рязанская область', value: 62 },
    { key: 63, text: 'Самарская область', value: 63 },
    { key: 64, text: 'Санкт-Петербург', value: 78 },
    { key: 65, text: 'Саратовская область', value: 64 },
    { key: 66, text: 'Сахалинская область', value: 65 },
    { key: 67, text: 'Свердловская область', value: 66 },
    { key: 68, text: 'Севастополь', value: 92 },
    { key: 69, text: 'Смоленская область', value: 67 },
    { key: 70, text: 'Ставропольский край', value: 26 },
    { key: 71, text: 'Тамбовская область', value: 68 },
    { key: 72, text: 'Тверская область', value: 69 },
    { key: 73, text: 'Томская область', value: 70 },
    { key: 74, text: 'Тульская область', value: 71 },
    { key: 75, text: 'Тюменская область', value: 72 },
    { key: 76, text: 'Удмуртская Республика', value: 18 },
    { key: 77, text: 'Ульяновская область', value: 73 },
    { key: 78, text: 'Хабаровский край', value: 27 },
    { key: 79, text: 'Ханты-Мансийский автономный округ - Югра', value: 86 },
    { key: 80, text: 'Челябинская область', value: 74 },
    { key: 81, text: 'Чеченская Республика', value: 20 },
    { key: 82, text: 'Чувашская Республика - Чувашия', value: 21 },
    { key: 83, text: 'Чукотский автономный округ', value: 87 },
    { key: 84, text: 'Ямало-Ненецкий автономный округ', value: 89 },
    { key: 85, text: 'Ярославская область', value: 76 }
]

const loaderText = [
    'Пожалуйста, подождите',
    'Не унывайте, осталось совсем чуть-чуть!',
    'Считаю вашу зарплату',
    'Делаю запрос в службу ФНС',
    'Ожидаем ответа от судебных приставов',
    'Выполняется запрос к службе занятности населения',
    'Подождите, связываемся с вашим работодателем',
    'Делаем расчет налоговой базы',
    'Ждём первого освободившегося сотрудника ФНС',
    'Сверяем ваши источники доходов',
    'Звоним в приёмную центра занятости',
    'Выполняем уточнение данных у вашего бухгалтера',
    'Начинаем вычислять уплаченную сумму налогов',
    'Выполняем запрос к службе гос. закупок',
    'Проверяем правильность полученной информации',
    'Выполняется расчет стоимости заключенных контрактов',
    'Уточняем данные у менторов Audition',
    'Стоим в очереди за справками',
    'Ждем конца обеденного перерыва',
    'Ищем интересную закупку',
]

class Main extends Component {
    state = {
        timer: null,
        loaderText: 'Загрузка',
        formLoader: false,
        errors: true,

        experience_year: 2,
        experience_month: 6,
        amount: 32400,

        region: 56,
        start: 24,
        word: ''
    }

    componentDidMount() {
        const { dispatch } = this.props
        const monthStart = moment().clone().startOf('month').format('DD-MM-YYYY')

        document.title = 'Налоговый калькулятор'

        // this.setState({calendarMoonPhrases: moonPhrase(monthStart, monthEnd)})
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { region, word } = this.state
        const { dataJSON } = this.props

        if (region !== prevState.region) {
            this.setState({ region })
            this.checkErrors()
        }

        if (word !== prevState.word) {
            this.setState({ word })
            this.checkErrors()
        }

        if (dataJSON !== prevProps.dataJSON) {
            clearInterval(this.state.timer)
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
        this.checkErrors()
    }

    handleSubmit = () => {
        const { dispatch } = this.props
        const { start, region, amount, word, experience_year, experience_month } = this.state

        this.setState({ formLoader: true })
        this.startTimer()

        dispatch(backActions.getData(this.totalMonth(experience_month, experience_year), region, amount, word))
    }

    handleNew = () => {
        const { dispatch } = this.props

        this.setState({ formLoader: false, errors: true })

        dispatch(backActions.clearData())
    }

    checkErrors = () => {
        const { region, amount, word } = this.state

        if ( ! region || ! word || ! amount) {
            this.setState({ errors: true })
        } else {
            this.setState({ errors: false })
        }
    }

    declOfNum = (number, words) => {
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
    }

    totalMonth = (month, year) => {
        if (year <= 0 && month <= 0) return 0
        if (year === 1) return month + 12
        if (year === 0) return month
        return month * year
    }

    startTimer = () => {
        let timer = setInterval(this.handlerTimer, 3500)
        this.setState({ timer })
    }

    handlerTimer = () => {
        this.setState({ loaderText: _.shuffle(loaderText)[0] })
    }

    render() {
        const { amount, formLoader, errors, experience_year, experience_month, salary, loaderText } = this.state
        const { dataJSON } = this.props

        //const dataJSON = {"product":"\u0412\u0430\u0442\u0430 \u043c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u0430\u044f \u0433\u0438\u0433\u0440\u043e\u0441\u043a\u043e\u043f\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u043d\u0435\u0441\u0442\u0435\u0440\u0438\u043b\u044c\u043d\u0430\u044f \u0445\u0438\u0440\u0443\u0440\u0433\u0438\u0447\u0435\u0441\u043a\u0430\u044f    250 \u0433\u0440., \u0438\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0430 \u0438\u0437 100% \u043e\u0447\u0438\u0449\u0435\u043d\u043d\u044b\u0445, \u043e\u0431\u0435\u0437\u0436\u0438\u0440\u0435\u043d\u043d\u044b\u0445 \u0438 \u043e\u0442\u0431\u0435\u043b\u0435\u043d\u043d\u044b\u0445 \u0445\u043b\u043e\u043f\u043a\u043e\u0432\u044b\u0445 \u0432\u043e\u043b\u043e\u043a\u043e\u043d.  \u0412\u0430\u0442\u0430 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0432\u0441\u0435\u043c \u0442\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f\u043c \u0413\u041e\u0421\u0422 5556-81. \u041c\u0430\u0441\u0441\u043e\u0432\u0430\u044f \u0434\u043e\u043b\u044f \u043f\u043b\u043e\u0442\u043d\u044b\u0445 \u043d\u0435\u0440\u0430\u0441\u0447\u0435\u0441\u0430\u043d\u043d\u044b\u0445 \u0441\u043a\u043e\u043f\u043b\u0435\u043d\u0438\u0439 \u0432\u043e\u043b\u043e\u043a\u043e\u043d-\u0443\u0437\u0435\u043b\u043a\u043e\u0432  2,4%. \u041c\u0430\u0441\u0441\u043e\u0432\u0430\u044f \u0434\u043e\u043b\u044f \u043a\u043e\u0440\u043e\u0442\u043a\u0438\u0445 \u0432\u043e\u043b\u043e\u043a\u043e\u043d (\u043c\u0435\u043d\u0435\u0435 5 \u043c\u043c) \u0438 \u0445\u043b\u043e\u043f\u043a\u043e\u0432\u043e\u0439 \u043f\u044b\u043b\u0438 0,15%. \u0417\u0430\u0441\u043e\u0440\u0435\u043d\u043d\u043e\u0441\u0442\u044c 0,30%. \u041d\u0435 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u0442 \u043f\u043e\u0441\u0442\u043e\u0440\u043e\u043d\u043d\u0438\u0445 \u043f\u0440\u0438\u043c\u0435\u0441\u0435\u0439: \u0438\u0433\u043e\u043b\u043e\u0447\u0435\u043a, \u0449\u0435\u043f\u043e\u0447\u0435\u043a \u0438 \u0434\u0440. \u0417\u043e\u043b\u044c\u043d\u043e\u0441\u0442\u044c  0,30%. \u041c\u0430\u0441\u0441\u043e\u0432\u0430\u044f \u0434\u043e\u043b\u044f \u0436\u0438\u0440\u043e\u0432\u044b\u0445 \u0438 \u0432\u043e\u0441\u043a\u043e\u043e\u0431\u0440\u0430\u0437\u043d\u044b\u0445 \u0432\u0435\u0449\u0435\u0441\u0442\u0432 0,35%. \u0412\u043b\u0430\u0436\u043d\u043e\u0441\u0442\u044c 8,0%. \u041f\u043e\u0433\u043b\u043e\u0442\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c 20 \u0433. \u041a\u0430\u043f\u0438\u043b\u043b\u044f\u0440\u043d\u043e\u0441\u0442\u044c 70 \u043c\u043c. \u0420\u0435\u0430\u043a\u0446\u0438\u044f \u0432\u043e\u0434\u043d\u043e\u0439 \u0432\u044b\u0442\u044f\u0436\u043a\u0438 - \u043d\u0435\u0439\u0442\u0440\u0430\u043b\u044c\u043d\u0430\u044f. \u041c\u0430\u0441\u0441\u043e\u0432\u0430\u044f \u0434\u043e\u043b\u044f \u0445\u043b\u043e\u0440\u0438\u0441\u0442\u044b\u0445 \u0441\u043e\u043b\u0435\u0439 0,04%. \u041c\u0430\u0441\u0441\u043e\u0432\u0430\u044f \u0434\u043e\u043b\u044f \u0441\u0435\u0440\u043d\u043e\u043a\u0438\u0441\u043b\u044b\u0445 \u0441\u043e\u043b\u0435\u0439 0,02%. \u041c\u0430\u0441\u0441\u043e\u0432\u0430\u044f \u0434\u043e\u043b\u044f \u043a\u0430\u043b\u044c\u0446\u0438\u0435\u0432\u044b\u0445 \u0441\u043e\u043b\u0435\u0439 0,06%. \u0421\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435 \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u044e\u0449\u0438\u0445 \u0432\u0435\u0449\u0435\u0441\u0442\u0432 - \u0441\u043b\u0435\u0434\u044b . \u0421\u0442\u0435\u043f\u0435\u043d\u044c \u0431\u0435\u043b\u0438\u0437\u043d\u044b 72%. \u0412\u0430\u0442\u0430 \u0445\u043e\u0440\u043e\u0448\u043e \u043f\u0440\u043e\u0447\u0435\u0441\u0430\u043d\u043d\u0430\u044f, \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u0442 \u0441\u0432\u044f\u0437\u044c \u043c\u0435\u0436\u0434\u0443 \u0432\u043e\u043b\u043e\u043a\u043d\u0430\u043c\u0438 \u0438 \u043b\u0435\u0433\u043a\u043e \u0440\u0430\u0441\u0441\u043b\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u043d\u0430 \u043f\u0430\u0440\u0430\u043b\u043b\u0435\u043b\u044c\u043d\u044b\u0435 \u0441\u043b\u043e\u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u043b\u044c\u043d\u043e\u0439 \u0442\u043e\u043b\u0449\u0438\u043d\u044b. \u0412\u0430\u0442\u0430 \u0443\u043f\u0430\u043a\u043e\u0432\u0430\u043d\u0430 \u0432 \u043f\u043e\u043b\u0438\u043f\u0440\u043e\u043f\u0438\u043b\u0435\u043d\u043e\u0432\u044b\u0439 \u043c\u0435\u0448\u043e\u043a, \u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0439 \u043a\u043b\u0435\u0435\u0432\u043e\u0439 \u043b\u0435\u043d\u0442\u043e\u0439. \u0421\u0440\u043e\u043a \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f 5 \u043b\u0435\u0442 \u0441 \u0434\u0430\u0442\u044b \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u0430. \u0421\u0442\u0440\u0430\u043d\u0430 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u0430 \u2013 \u0420\u043e\u0441\u0441\u0438\u044f. \u0420\u0423 \u0424\u0421\u0420 2009\/04485 \u043e\u0442 11.03.2009\r\n\u0418\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0430 \u0432 2020 \u0433.\r\n\u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u0430\u044f \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u044f","customerName":"\"\u0410\u0421\u0422\u0420\u0410\u0425\u0410\u041d\u0421\u041a\u0410\u042f \u041a\u041b\u0418\u041d\u0418\u0427\u0415\u0421\u041a\u0410\u042f \u0411\u041e\u041b\u042c\u041d\u0418\u0426\u0410\" \u0424\u0415\u0414\u0415\u0420\u0410\u041b\u042c\u041d\u041e\u0413\u041e \u0413\u041e\u0421\u0423\u0414\u0410\u0420\u0421\u0422\u0412\u0415\u041d\u041d\u041e\u0413\u041e \u0411\u042e\u0414\u0416\u0415\u0422\u041d\u041e\u0413\u041e \u0423\u0427\u0420\u0415\u0416\u0414\u0415\u041d\u0418\u042f \u0417\u0414\u0420\u0410\u0412\u041e\u041e\u0425\u0420\u0410\u041d\u0415\u041d\u0418\u042f \"\u042e\u0416\u041d\u042b\u0419 \u041e\u041a\u0420\u0423\u0416\u041d\u041e\u0419 \u041c\u0415\u0414\u0418\u0426\u0418\u041d\u0421\u041a\u0418\u0419 \u0426\u0415\u041d\u0422\u0420 \u0424\u0415\u0414\u0415\u0420\u0410\u041b\u042c\u041d\u041e\u0413\u041e \u041c\u0415\u0414\u0418\u041a\u041e-\u0411\u0418\u041e\u041b\u041e\u0413\u0418\u0427\u0415\u0421\u041a\u041e\u0413\u041e \u0410\u0413\u0415\u041d\u0422\u0421\u0422\u0412\u0410\"","customerAddress":"\u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u0430\u044f \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u044f, 414016, \u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b, \u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u044c \u0433, \u0443\u043b \u0427\u041a\u0410\u041b\u041e\u0412\u0410, 80\/95\/1","execution":{"startDate":"2020-12-14T00:00:00","endDate":"2021-01-30T00:00:00"},"price":18962.490000000002,"ndfl":78897,"url":"http:\/\/zakupki.gov.ru\/epz\/contract\/contractCard\/common-info.html?reestrNumber=1616706334420001009","other":0}

        return (
            <MainContainer>
                <Container>
                    <Grid>
                        <Grid.Column mobile={16} tablet={8} computer={10}>
                            <h1>Узнай что купили на твои налоги</h1>
                            <div className="ya-share2" data-curtain data-services="vkontakte,facebook,odnoklassniki,telegram,twitter,viber,whatsapp"></div>
                            <div className='telegram-link'>
                                <a href='http://t.me/sellusnalogbot' target='_blank'><Icon name='telegram' size='large' />@sellusnalogbot</a>
                            </div>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                                {(_.isEmpty(dataJSON)) ? (
                                    <Form onSubmit={this.handleSubmit}>
                                        {formLoader && (
                                            <Dimmer active>
                                                <Loader>{loaderText}</Loader>
                                            </Dimmer>
                                        )}
                                        <div className='panel'>
                                            <h3>Введите свои данные</h3>
                                            <div className='slider'>
                                                <div className='slider-label'>
                                                    <label>Выберите период</label>
                                                    <div className='value'>{experience_year} {this.declOfNum(experience_year, ['год', 'года', 'лет'])}</div>
                                                </div>
                                                <Slider
                                                    color="red"
                                                    settings={{
                                                        start: experience_year,
                                                        min: 0,
                                                        max: 40,
                                                        step: 1,
                                                        onChange: value => {
                                                            this.setState({ experience_year: value })
                                                        }
                                                    }}
                                                />
                                                <div className='slider-label'>
                                                    <label></label>
                                                    <div className='value'>{experience_month} {this.declOfNum(experience_month, ['месяц', 'месяца', 'месяцев'])}</div>
                                                </div>
                                                <Slider
                                                    color="red"
                                                    settings={{
                                                        start: experience_month,
                                                        min: 0,
                                                        max: 12,
                                                        step: 1,
                                                        onChange: value => {
                                                            this.setState({ experience_month: value })
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className='slider'>
                                                <div className='slider-label'>
                                                    <label>Моя среднемесячная зарплата</label>
                                                    <div className='value'>{amount.toLocaleString()} ₽</div>
                                                </div>
                                                <Slider
                                                    color="red"
                                                    settings={{
                                                        start: amount,
                                                        min: 7000,
                                                        max: 140000,
                                                        step: 500,
                                                        onChange: value => {
                                                            this.setState({ amount: value })
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <Form.Field
                                                name='region'
                                                control={Select}
                                                options={regionOptions}
                                                label={{ children: 'Мой регион', htmlFor: 'form-select-control-region' }}
                                                placeholder='Выберите регион проживания'
                                                search
                                                searchInput={{ id: 'form-select-control-region' }}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Field
                                                name='word'
                                                control={Select}
                                                options={genderOptions}
                                                label={{ children: 'Моя сфера деятельности', htmlFor: 'form-select-control-word' }}
                                                placeholder='Выберите свою сферу деятельности'
                                                search
                                                searchInput={{ id: 'form-select-control-word' }}
                                                onChange={this.handleChange}
                                            />
                                            <div className='nalog'>
                                                <div className='name'>Оплаченный налог</div>
                                                <div className='value'>{(Math.round((amount/0.87)*0.13) * this.totalMonth(experience_month, experience_year)).toLocaleString()} ₽</div>
                                            </div>
                                            <Button type='submit' disabled={errors} fluid color='red'>Узнать</Button>
                                        </div>
                                    </Form>
                                ) : (
                                    <div className='panel'>
                                        {!_.isNull(dataJSON.product) ? (
                                            <div className='center'>
                                                <p>За <b>{experience_year}</b> {this.declOfNum(experience_year, ['год', 'года', 'лет'])} и <b>{experience_month}</b> {this.declOfNum(experience_month, ['месяц', 'месяца', 'месяцев'])} вы заплатили из своей зарплаты <b>{(Math.round((amount/0.87)*0.13) * this.totalMonth(experience_month, experience_year)).toLocaleString()} ₽</b> налоговых отчислений.</p>
                                                <p>На эту сумму в учреждение:</p>
                                                <p className='customer'>{dataJSON.customerName}</p>
                                                <p>Находящееся по адресу:</p>
                                                <p className='customer'>{dataJSON.customerAddress}</p>
                                                <p>Было закуплено:</p>
                                                <p className='customer'><a href={dataJSON.url} target='_blank'>{dataJSON.product}</a></p>
                                                <p>Спасибо за ваш вклад в развитие региона!</p>
                                                <br/>
                                            </div>
                                        ) : (
                                            <div>Возникла ошибка, выполните запрос еще раз</div>
                                        )}
                                        {/*<div>{JSON.stringify(dataJSON, null, 2)}</div>*/}
                                        {/*<br /><br /><br />*/}
                                        <Button onClick={this.handleNew} fluid color='red'>Новый расчет</Button>
                                    </div>
                                )}
                        </Grid.Column>
                    </Grid>
                    <img src='/images/frame1.png' className='frame' />
                    <img src='/images/frame2.png' className='frame' />
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        dataJSON: state.back.dataJSON
    }
}

export default connect(mapStateToProps)(Main)