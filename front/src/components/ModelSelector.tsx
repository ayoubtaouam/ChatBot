import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useModels } from '../hooks/useModels';

export const ModelSelector = () => {
  const { models, select } = useModels();

  const selected = models.find((m: any) => (m.selected ?? m.isSelected));

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="model-select-label">Model</InputLabel>
      <Select
        labelId="model-select-label"
        value={selected?.name ?? ''}
        label="Model"
        onChange={(e) => select(e.target.value as string)}
      >
        {models.map((m: any) => (
          <MenuItem key={m.name} value={m.name}>
            {m.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModelSelector;