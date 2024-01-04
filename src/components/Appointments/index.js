import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem/index'

import './index.css'

const listOfAppointments = []

class Appointments extends Component {
  state = {
    titleInputValue: '',
    dateInputValue: '',
    list: listOfAppointments,
    btnClicked: false,
    isStarredFilterActive: false,
  }

  titleInputEvent = event => {
    this.setState({titleInputValue: event.target.value})
  }

  dateInputEvent = event => {
    console.log(event.target.value) // 2023-09-18
    const dateValue = event.target.value

    this.setState({dateInputValue: dateValue})
  }

  clickedOnAddButton = event => {
    event.preventDefault()
    const {titleInputValue, dateInputValue} = this.state
    const formattedDate = format(new Date(dateInputValue), 'dd MMMM yyyy, EEEE')
    const newList = {
      id: uuidv4(),
      title: titleInputValue,
      dateString: formattedDate,
      isStarActive: false,
    }
    this.setState(prevState => ({
      list: [...prevState.list, newList],
      btnClicked: true,
      titleInputValue: '',
      dateInputValue: '',
    }))
  }

  starBtn = idNum => {
    this.setState(prevState => ({
      list: prevState.list.map(eachObject => {
        if (idNum === eachObject.id) {
          return {...eachObject, isStarActive: !eachObject.isStarActive}
        }
        return eachObject
      }),
    }))
  }

  clickedOnStarredButton = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  render() {
    const {
      list,
      titleInputValue,
      dateInputValue,
      btnClicked,
      isStarredFilterActive,
    } = this.state

    let finalList
    if (isStarredFilterActive) {
      finalList = list.filter(eachObject => eachObject.isStarActive === true)
    } else {
      finalList = [...list]
    }

    const renderAuth = () => {
      if (btnClicked) {
        return finalList.map(eachObject => (
          <AppointmentItem
            eachObjectProp={eachObject}
            starBtnProp={this.starBtn}
            key={eachObject.id}
          />
        ))
      }
      return null
    }

    const starredBtnStyle = isStarredFilterActive
      ? 'starredBtnActiveChecked'
      : ''

    return (
      <div className="bg">
        <div className="innerCard">
          <h1>Add Appointment</h1>
          <div className="upperContainer">
            <form className="formContainer">
              <div className="titleContainer">
                <label htmlFor="titleId" className="titleTextStyle">
                  TITLE
                </label>
                <input
                  type="text"
                  id="titleId"
                  placeholder="Title"
                  className="titleInputStyle"
                  value={titleInputValue}
                  onChange={this.titleInputEvent}
                />
              </div>

              <div className="dateContainer">
                <label htmlFor="dateId" className="dateTextStyle">
                  DATE
                </label>
                <input
                  type="date"
                  id="dateId"
                  className="dateInputStyle"
                  value={dateInputValue}
                  onChange={this.dateInputEvent}
                />
              </div>

              <button
                className="addBtnEl"
                type="button"
                onClick={this.clickedOnAddButton}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="imagePromotion"
            />
          </div>
          <hr className="horizontalLine" />
          <div className="lowerHeadContainer">
            <h1 className="lowerText">Appointments</h1>
            <button
              type="button"
              className={`starredBtnEl ${starredBtnStyle}`}
              onClick={this.clickedOnStarredButton}
            >
              Starred
            </button>
          </div>

          <div className="ulContainer">
            <ul>{renderAuth()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
