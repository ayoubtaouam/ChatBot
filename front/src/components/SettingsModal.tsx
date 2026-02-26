import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { SettingsService } from '../services/settings.service';
import { ModelSelector } from './ModelSelector';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SettingsModal({ open, onClose }: Props) {
    const [apiKey, setApiKey] = useState('');
    const [saving, setSaving] = useState(false);
    //const [configured, setConfigured] = useState(false);
    /*useEffect(() => {
        if(open) {
            SettingsService.getStatus().then(status => {
                setConfigured(status.configured);
            });
        }
    }, [open]);*/

    const handleSave = async () => {
    try { 
        setSaving(true);
        await SettingsService.saveApiKey(apiKey);
        //setConfigured(true);
        alert('API Key saved successfully!');
    } catch (err) {
        console.error('Error saving API Key:', err);
        alert('Failed to save API Key. Please try again.');
    } finally {
        setSaving(false);
    }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        OpenAI API Key
                    </Typography>

                    <TextField
                        label="API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        fullWidth
                        type="password"
                        placeholder="Enter your OpenAI API Key"
                    />
                    <Button 
                        variant="contained" 
                        sx={{ mt: 2 }}
                        onClick={handleSave}
                        disabled={saving}
                    >
                        Save & Validate
                    </Button>

                    {/*configured && (
                        <Typography variant="caption" color="success.main">
                            API Key is configured and valid.
                        </Typography>
                    )*/}
                </Box>
                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Model Selection
                    </Typography>
                    <ModelSelector />
                </Box>
            </DialogContent>
        </Dialog>
    );
}