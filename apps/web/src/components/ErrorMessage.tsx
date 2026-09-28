import { Typography } from '@mui/material';

export default function ErrorMessage({ message }: { message: string }) {
  if (!message) return <></>;

  return (
    <Typography component="div" sx={{ color: 'var(--red-6)' }} variant="T12R">
      {message}
    </Typography>
  );
}
