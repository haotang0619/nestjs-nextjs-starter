import { ReactNode } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  SxProps,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { CloseCircle } from 'iconsax-react';

import { GENERAL_Z_INDEX } from '@/constants/layout';
import { mergeSx } from '@/theme/util';

import { LoaderCircle } from './LoaderCircle';

export interface ConfirmModalProps {
  cancelText?: string;
  children?: ReactNode;
  confirmText: string;
  isConfirming?: boolean;
  onCancel: () => void;
  onClose?: () => void;
  onConfirm: (e: any) => void;
  open: boolean;
  sx?: SxProps<Theme>;
  title: ReactNode;
}

export const ConfirmModal = ({
  cancelText,
  children = <></>,
  confirmText,
  isConfirming = false,
  onCancel,
  onClose,
  onConfirm,
  open,
  sx,
  title,
}: ConfirmModalProps) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const Container = isMobile ? MobileContainer : DesktopContainer;

  return (
    <Container onClose={isConfirming ? undefined : (onClose ?? onCancel)} open={open} sx={sx}>
      <CloseButton onClose={isConfirming ? undefined : (onClose ?? onCancel)} />

      <DialogTitle>{title}</DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        {cancelText && (
          <Button
            color="inherit"
            disabled={isConfirming}
            onClick={onCancel}
            size="large"
            variant="outlined"
          >
            {cancelText}
          </Button>
        )}

        <Button
          color="inherit"
          disabled={isConfirming}
          onClick={onConfirm}
          size="large"
          startIcon={isConfirming && <LoaderCircle />}
          variant="contained"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Container>
  );
};

interface ContainerProps {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  sx?: SxProps<Theme>;
}

const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <IconButton
    className="close-button"
    onClick={onClose}
    sx={{
      color: 'var(--neutral-10)',
      position: 'absolute',
      right: '12px',
      top: '12px',
      zIndex: GENERAL_Z_INDEX.IN_FRONT_LEVEL_1,
    }}
  >
    <CloseCircle size={24} />
  </IconButton>
);

const MobileContainer = ({ children, onClose, open, sx }: ContainerProps) => {
  return (
    <Drawer
      PaperProps={{ sx: { maxHeight: 'calc(var(--100vh) - 64px)' } }}
      anchor="bottom"
      onClose={onClose}
      open={open}
      sx={mergeSx(
        {
          '& .MuiDrawer-paper': {
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            flexFlow: 'column',
            gap: '32px',
            padding: '20px',
          },
          zIndex: GENERAL_Z_INDEX.MODAL,
        },
        sx,
      )}
    >
      {children}
    </Drawer>
  );
};

const DesktopContainer = ({ children, onClose, open, sx }: ContainerProps) => {
  return (
    <Dialog onClose={onClose} open={open} sx={mergeSx({ zIndex: GENERAL_Z_INDEX.MODAL }, sx)}>
      {children}
    </Dialog>
  );
};

export const CommonModal = ({
  children,
  disableBackdrop = false,
  onClose,
  open,
  sx,
}: { disableBackdrop?: boolean } & ContainerProps) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const Container = isMobile ? MobileContainer : DesktopContainer;

  return (
    <Container onClose={disableBackdrop ? undefined : onClose} open={!!open} sx={sx}>
      <CloseButton onClose={onClose} />
      {children}
    </Container>
  );
};
