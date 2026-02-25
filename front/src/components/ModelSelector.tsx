import { FormControl, Select, MenuItem } from '@mui/material';
import { useModels } from '../hooks/useModels';

export const ModelSelector = () => {
  const { models, select } = useModels();

  const selected = models.find((m: any) => (m.selected ?? m.isSelected));

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <Select
        value={selected?.name ?? ''}
        displayEmpty
        onChange={(e) => select(e.target.value as string)}
        sx={{
          bgcolor: 'transparent',
          color: '#1a1a1a',
          fontSize: 14,
          fontWeight: 600,
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '& .MuiSvgIcon-root': { color: '#6b6c7b' },
          '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
          borderRadius: 2,
        }}
        renderValue={(value) => value || 'Select model'}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#ffffff',
              border: '1px solid #d9d9e3',
              borderRadius: 2,
              mt: 0.5,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
          },
        }}
      >
        {models.map((m: any) => (
          <MenuItem
            key={m.name}
            value={m.name}
            sx={{
              fontSize: 14,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              '&.Mui-selected': {
                bgcolor: 'rgba(25,118,210,0.08)',
                '&:hover': { bgcolor: 'rgba(25,118,210,0.12)' },
              },
            }}
          >
            {m.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModelSelector;