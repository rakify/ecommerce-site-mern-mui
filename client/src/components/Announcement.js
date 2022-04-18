import { Box } from '@mui/material'
import React from 'react'

const Announcement = () => {
  return (
    <Box flex={2} bgcolor='coral' p={2}  sx={{
        display:{xs:'none', sm:'block'}}}>Announcement</Box>
  )
}

export default Announcement
