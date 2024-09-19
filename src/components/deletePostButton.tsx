import { Button } from './ui/button';
import axios from 'axios';

export default function DeletePostButton({ id, onDelete }: { id: string; onDelete: (id: string) => void }) {

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      console.log('Post deleted successfully:', response.data);

      onDelete(id);
    } catch (error) {
      console.error('An error occurred while deleting the post:', error);
    }
  }

  return (
    <Button onClick={handleDelete} className="bg-red-800 hover:bg-primary">
      Delete
    </Button>
  );
}
