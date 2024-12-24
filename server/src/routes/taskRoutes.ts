import express from 'express';
import { getTasks, createTask , updatedTask} from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:TaskId/status', updatedTask);
export default router;
