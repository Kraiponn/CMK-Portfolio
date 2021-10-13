import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorIcon from '@mui/icons-material/Error';
import { Button, Divider } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  handleClose: () => void;
  errTitlte?: string;
  errDetail?: string;
}

export default function KSModal({
  open,
  handleClose,
  errTitlte,
  errDetail,
}: Props) {
  return (
    <>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            <ErrorIcon fontSize="large" color="error" /> {errTitlte}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errDetail}
          </Typography>

          <Divider />
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => handleClose()}
            >
              Exit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
