import { useTheme } from '@mui/material';
import NextProgressBar from 'nextjs-progressbar';

export default function ProgressBar() {
  const { palette } = useTheme();
  return <NextProgressBar color={palette.primary.main} showOnShallow={false} />;
}
