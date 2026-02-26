import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ConversationSummary } from '../types/chat.types';

interface SidebarProps {
  conversations: ConversationSummary[];
  activeId: number | null;
  loading: boolean;
  onSelect: (id: number) => void;
  onNewChat: () => void;
  onDelete: (id: number) => void;
}

export const Sidebar = ({
  conversations,
  activeId,
  loading,
  onSelect,
  onNewChat,
  onDelete,
}: SidebarProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
      setDeleteId(null);
    }
};

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <>
  <Box
    sx={{
      width: 260,
      minWidth: 260,
      height: '100%',
      bgcolor: '#f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(0,0,0,0.08)',
    }}
  >
    {/* New Chat Button */}
    <Box sx={{ p: 1.5 }}>
      <Box
        onClick={onNewChat}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'background 0.15s',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' },
        }}
      >
        <IconButton
          size="small"
          sx={{
            bgcolor: '#1976d2',
            color: '#fff',
            width: 32,
            height: 32,
            '&:hover': { bgcolor: '#1565c0' },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
          New chat
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />

    {/* Conversation List */}
    <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
      {loading ? (
        <Box px={2} py={1}>
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={36}
              sx={{ mb: 0.5, bgcolor: 'rgba(0,0,0,0.06)' }}
            />
          ))}
        </Box>
      ) : conversations.length === 0 ? (
        <Box sx={{ px: 2, py: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#8e8ea0' }}>
            No conversations yet
          </Typography>
        </Box>
      ) : (
        <List dense disablePadding>
          {conversations.map((conv) => (
            <Box
              key={conv.id}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.25,
                display: 'flex',
                alignItems: 'center',
                pr: 0.5,
                '&:hover .delete-chat-btn': {
                  opacity: 1,
                },
              }}
            >
              <ListItemButton
                selected={conv.id === activeId}
                onClick={() => onSelect(conv.id)}
                sx={{
                  borderRadius: 1.5,
                  py: 1,
                  px: 1.5,
                  flex: 1,
                  minWidth: 0,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(25,118,210,0.08)',
                    '&:hover': { bgcolor: 'rgba(25,118,210,0.12)' },
                  },
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
                }}
              >
                <ChatBubbleOutlineIcon
                  sx={{ fontSize: 16, mr: 1.5, color: '#6b6c7b', flexShrink: 0 }}
                />
                <ListItemText
                  primary={conv.title}
                  primaryTypographyProps={{
                    variant: 'body2',
                    noWrap: true,
                    sx: { color: '#1a1a1a' },
                  }}
                />
              </ListItemButton>

              <IconButton
                className="delete-chat-btn"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  setDeleteId(conv.id);
                }}
                sx={{
                  ml: 0.5,
                  opacity: 0,
                  color: '#6b6c7b',
                  '&:hover': { color: '#d32f2f', bgcolor: 'rgba(211,47,47,0.08)' },
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </List>
      )}
    </Box>
  </Box>
  {/* Delete Confirmation Dialog */}
  <Dialog open={deleteId !== null} onClose={handleCancelDelete}>
    <DialogTitle>Delete conversation?</DialogTitle>
    <DialogContent sx={{ pb: 2 }}>
      <DialogContentText>
        Are you sure you want to delete this chat? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{px: 3, pb: 2, pt: 1.5, gap: 5}}>
      <Button onClick={handleCancelDelete}>Cancel</Button>
      <Button
        onClick={handleConfirmDelete}
        color="error"
        variant="contained"
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  </>
);
};