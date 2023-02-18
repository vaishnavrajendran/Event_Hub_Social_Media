import { parseISO, formatDistanceToNow } from 'date-fns'
import React from 'react'
import { useTheme } from '@mui/material'
import { color } from '@mui/system'

const TImeAgo = ({timestamp}) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
  return (
    <span style={{marginTop:'1rem'}} title={timestamp}>
      &nbsp; <i style={{fontSize:"0.7rem",color:'main'}} >{timeAgo}</i>
    </span>
  )
}
export default TImeAgo