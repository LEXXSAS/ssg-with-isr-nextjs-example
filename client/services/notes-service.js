import $api from "../http";

export default class NotesService {
  static fetchAllNotes = () => {
    return $api.get(`/data/notes`)
  }
  static fetchCount() {
    return $api.get(`/data/count`)
  }
  static nextPagination(currentpage, prioritynext, searchvaluenext) {
    return $api.get(`/data/nextpageandpagination/?currentpage=${currentpage}&prioritynext=${prioritynext}&searchvaluenext=${searchvaluenext}`)
  }
  static prevPagination(currentpage, priorityprev, searchvalueprevious) {
    return $api.get(`/data/previouspageandpagination/?currentpage=${currentpage}&priorityprev=${priorityprev}&searchvalueprevious=${searchvalueprevious}`)
  }
  static searchNotesByTitle(search) {
    return $api.get(`/data/searchnotesbytitle/?search=${search}`)
  }
  static fetchByAuthorAndPriorityNotes(author, priority) {
    return $api.get(`/data/notesbyauthorandpriority/?priority=${priority}&author=${author}`)
  }
  static fetchByPriorityOrAllNotes(priority) {
    return $api.get(`/data/notesbypriority/?priority=${priority}`)
  }
  static fetchByAuthor(author) {
    return $api.get(`/data/notesbyauthor/?author=${author}`)
  }
  static fetchAllAuthor() {
    return $api.get(`/data/author`)
  }
  static fetchAllPriority() {
    return $api.get(`/data/priority`)
  }
  static updateNotePriority(priority, priorityid) {
    return $api.get(`/data/updatenotepriority/?priority=${priority}&priorityid=${priorityid}`)
  }
}

// https://nodeserverthree.1lexxs.com/api/searchqueryall?query=&p=0&perpage=5
// $api.get(`/searchqueryall?query=${query}&p=${currentPage - 1}&perpage=${pageQty}`)
// localhost/api/data/notes
