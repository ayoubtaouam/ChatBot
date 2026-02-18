import { Chip } from '@mui/material';

export const ModelBadge = ({ model }: { model: string }) => (
  <Chip label={`Using: ${model}`} color="secondary" size="small" />
);