import express from 'express';
import { getAll, getAllAuthor, getAllPriiority, getCount, getNotesByAuthor, getNotesByAuthorAndPriority, getNotesByPriority, nextPageAndPagination, prevPageAndPagination, searchNotesByTitle, updateNotePriority } from '../controllers/data-controller.js'

const router = express.Router();

router.get('/count', getCount);
router.get('/notes', getAll);
router.get('/author', getAllAuthor);
router.get('/priority', getAllPriiority);
router.get('/notesbyauthor', getNotesByAuthor);
router.get('/notesbypriority', getNotesByPriority);
router.get('/notesbyauthorandpriority', getNotesByAuthorAndPriority);
router.get('/searchnotesbytitle', searchNotesByTitle);
router.get('/nextpageandpagination', nextPageAndPagination);
router.get('/previouspageandpagination', prevPageAndPagination);
router.get('/updatenotepriority', updateNotePriority);

export default router;
