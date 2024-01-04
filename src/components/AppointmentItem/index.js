// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachObjectProp, starBtnProp} = props
  const {id, title, dateString, isStarActive} = eachObjectProp

  const starBtnClicked = () => {
    starBtnProp(id)
  }

  const imgUrl = isStarActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="liContainer">
      <div>
        <p className="starHead">{title}</p>
        <p className="starPara">{dateString}</p>
      </div>

      <button
        type="button"
        className="starBtnEl"
        data-testid="star"
        onClick={starBtnClicked}
      >
        <img src={imgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
