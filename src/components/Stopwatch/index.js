// Write your code here
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {timer: 0, isRunning: false, intervalId: null}

  componentDidMount() {
    const {isRunning} = this.state
    console.log(isRunning)
    if (isRunning === true) {
      this.startTimer()
    }
  }

  componentWillUnmount() {
    this.clearInterval()
  }

  formatedTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60).toString()
    const seconds = (timeInSeconds % 60).toString()
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
  }

  startTimer = () => {
    const intervalId = setInterval(this.tick, 1000)
    this.setState({intervalId})
  }

  tick = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
    }))
  }

  clearInterval = () => {
    const {intervalId} = this.state
    clearInterval(intervalId)
  }

  onStart = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.setState(
        {
          isRunning: true,
        },
        () => {
          if (this.state.isRunning) {
            this.startTimer()
          }
        },
      )
    }
  }

  onStopBtn = () => {
    this.setState(
      {
        isRunning: false,
      },
      this.clearInterval(),
    )
  }

  onResetBtn = () => {
    this.setState({
      timer: 0,
      isRunning: false,
    })
    this.clearInterval()
  }

  render() {
    const {timer} = this.state
    const formatedTimer = this.formatedTime(timer)
    return (
      <div className="bg-container">
        <main className="content-container">
          <div className="content-sub-container">
            <h1 className="heading">Stopwatch</h1>
            <section className="timer-card">
              <div className="timer-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                  alt="stopwatch"
                  className="timer-logo"
                />
                <h1 className="timer-logo-text">Timer</h1>
              </div>
              <h1 className="timer">{formatedTimer}</h1>
              <div className="timer-btn-container">
                <button
                  type="button"
                  style={{backgroundColor: '#1db05f'}}
                  onClick={this.onStart}
                >
                  Start
                </button>
                <button
                  type="button"
                  style={{backgroundColor: '#ef0d36'}}
                  onClick={this.onStopBtn}
                >
                  Stop
                </button>
                <button
                  type="button"
                  style={{backgroundColor: '#eaa800'}}
                  onClick={this.onResetBtn}
                >
                  Reset
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  }
}

export default Stopwatch
