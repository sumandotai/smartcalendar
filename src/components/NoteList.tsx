import React from 'react';
import { Plus, Pencil, Check, X, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { DeleteConfirmation } from './DeleteConfirmation';

interface NoteListProps {
  date: string;
}

export const NoteList = ({ date }: NoteListProps) => {
  const [newNote, setNewNote] = React.useState('');
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editContent, setEditContent] = React.useState('');
  const [deleteNoteId, setDeleteNoteId] = React.useState<string | null>(null);
  const { notes, addNote, deleteNote } = useStore();

  const dateNotes = notes.filter((note) => note.date === date);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addNote({
      id: crypto.randomUUID(),
      content: newNote,
      date: date,
    });
    setNewNote('');
  };

  const handleEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSaveEdit = (id: string) => {
    if (!editContent.trim()) return;
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: editContent } : note
    );
    useStore.setState({ notes: updatedNotes });
    setEditingId(null);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    setDeleteNoteId(null);
  };

  return (
    <section className="bg-[#E5E1DA] rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-medium mb-4 text-[#89A8B2]">Notes</h2>
      <form onSubmit={handleAddNote} className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#89A8B2] bg-white transition-all"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-[#89A8B2] text-white rounded-lg hover:bg-[#B3C8CF] transition-colors"
        >
          Add Note
        </button>
      </form>

      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {dateNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group relative p-4 bg-white rounded-lg transition-all hover:shadow-md"
            >
              {editingId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#89A8B2]"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(note.id)}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="pr-16">{note.content}</div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 flex gap-2 transition-all">
                    <button
                      onClick={() => handleEdit(note.id, note.content)}
                      className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteNoteId(note.id)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <DeleteConfirmation
        isOpen={deleteNoteId !== null}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={() => deleteNoteId && handleDeleteNote(deleteNoteId)}
        title="Are you sure you want to delete this note? This action cannot be undone."
      />
    </section>
  );
};