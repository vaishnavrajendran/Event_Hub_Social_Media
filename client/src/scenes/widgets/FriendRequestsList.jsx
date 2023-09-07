import { Box, Dialog, Typography } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import UserImage from 'components/UserImage'
import React from 'react'

const FriendRequestsList = () => {
  return (
    <>
      <PersonAddIcon
        sx={{ fontSize: "25px" }}
        onClick={() => setOpen(true)}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={styles.dialogContainer}>
          <Typography sx={{ padding: "2rem", textAlign: "center", fontSize: "1.5rem" }} >Friend Requests</Typography>
          <FlexBetween sx={{ paddingTop: "1.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} gap="0.5rem">
            <FlexBetween gap="1rem">
              <UserImage size="55px" />
              <Box
              >
                <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >

                </Typography>
                <Typography color={medium} fontSize="0.75rem">

                  JOB
                </Typography>
              </Box>
            </FlexBetween>
            <Button>
              Accept
            </Button>
            <Button>
              Reject
            </Button>
          </FlexBetween>
        </div>
      </Dialog>
    </>
  )
}

export default FriendRequestsList
