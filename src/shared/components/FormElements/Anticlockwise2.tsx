import React, { useState, useEffect } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface Props {
  time: number
}

const Anticlockwise2 = ({ time }: Props) => {
  const timeMiliseconds = time * 1000
  const intervalMiliseconds = 125

  const [percentage, setPercentage] = useState<number>(0)
  const [timerRunning, setTimerRunning] = useState(false)

  const triggerClock = () => {
    setTimerRunning(true)
  }

  const step = 100 / (timeMiliseconds / intervalMiliseconds)

  useEffect(() => {
    if (timerRunning) {
      const interval = window.setInterval(() => {
        console.log({ interval })
        setPercentage((prevPercentage) => {
          if (prevPercentage >= 100) {
            setTimerRunning(false)
            return 0
          } else {
            return prevPercentage + step
          }
        })
      }, intervalMiliseconds)

      return () => {
        window.clearInterval(interval)
        console.log('desmontajte')
        console.log({ interval })
      }
    }
  }, [timerRunning])

  useEffect(() => {
    triggerClock()
  }, [])

  return (
    <Box>
      <Button onClick={triggerClock}>start</Button>
      <p>{timerRunning ? 'Timer is running' : 'Timer is not running'}</p>
      <p>{'Percentaje' + percentage}</p>

      <CircularProgressbar
        value={percentage}
        strokeWidth={50}
        styles={buildStyles({
          strokeLinecap: 'butt',
          pathColor: 'red',
          trailColor: 'gold',
          pathTransition:
            percentage === 0 ? 'none' : 'stroke-dashoffset 0.5s ease 0s',
        })}
      />
    </Box>
  )
}

export default Anticlockwise2
