import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStared} = props
  const {title, date, isStared, id} = appointmentDetails

  const formatDate = (new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickstarButton = () => {
    toggleIsStared(id)
  }

  const imgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="appointment-details-container">
        <p className="heading">{title}</p>

        <button
          type="button"
          className="button"
          onClick={onClickstarButton}
          data-testid="star"
        >
          <img src={imgUrl} alt="star" />
        </button>
        <p className="date">{formatDate}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
