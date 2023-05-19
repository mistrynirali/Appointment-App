import './index.css'
import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isStared: false,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    if (titleInput !== '' && dateInput !== '') {
      this.setState(prevState => ({
        appointmentsList: [
          ...prevState.appointmentsList,
          {
            id: uuidv4(),
            title: titleInput,
            date: dateInput,
            isStared: false,
          },
        ],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  toggleIsStared = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  filterStar = () =>
    this.setState(prevState => ({isStared: !prevState.isStared}))

  render() {
    const {appointmentsList, titleInput, dateInput, isStared} = this.state

    const starredAppointment = appointmentsList.filter(
      eachAppoin => eachAppoin.isStared,
    )

    const renderList = appointments =>
      appointments.map(eachItem => (
        <AppointmentItem
          key={eachItem.id}
          appointmentDetails={eachItem}
          toggleIsStared={this.toggleIsStared}
        />
      ))

    const toggleStarred = isStared ? 'active-star' : ''
    return (
      <div className="app-conatainer">
        <div className="card-conatainer">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-container">
            <form onSubmit={this.onAddAppointment}>
              <label className="title" htmlFor="titleInputs">
                TITLE
              </label>
              <input
                id="titleInputs"
                type="text"
                className="title-input"
                value={titleInput}
                onChange={this.onChangeTitle}
                placeholder="Title"
              />
              <label className="date" htmlFor="dateInputs">
                DATE
              </label>
              <input
                id="dateInputs"
                type="date"
                className="date-input"
                value={dateInput}
                onChange={this.onChangeDate}
                placeholder="dd/mm/yyyy"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="list-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${toggleStarred}`}
              onClick={this.filterStar}
            >
              Starred
            </button>

            <ul className="ul">
              {isStared
                ? renderList(starredAppointment)
                : renderList(appointmentsList)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
