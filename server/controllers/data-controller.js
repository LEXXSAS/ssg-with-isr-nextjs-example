// @ts-nocheck
import { db } from "../db.js";

let rowperpage = 4;
let pages = null;
let countresult = null;

// выборка количества заметок и страниц
export const getCount = (req, res) => {
  const countsql = `SELECT COUNT(*) FROM notes`;

  db.query(countsql, (err, data) => {
    if (err) return res.status(500).json(err);

    const property = 'COUNT(*)'
    const countPosts = data[0][property];
    pages = Math.ceil(countPosts/rowperpage);

    return res.status(200).json({count: countPosts, pages: pages});
  });
};

// выборка всех заметок с лимитом на страницу
export const getAll = async(req, res) => {

  let defaultStarnewpage = 1;
  let start = 0;
  let page = null;

  const dataPerPage = req.query.perpage || 4

  page = start * Number(dataPerPage) ;

  let q = `SELECT * FROM notes ORDER BY id ASC LIMIT ${page}, ${Number(dataPerPage)}`;

  if (Number(dataPerPage) === 0) {
    q = `SELECT * FROM notes ORDER BY id ASC`;
  }
  const sqlcount = "SELECT COUNT(*) FROM notes";

  db.query(sqlcount, (err, data) => {
    if (err) return res.status(500).json(err);

    const property = 'COUNT(*)';
    const countPriority = data[0][property];
    if (Number(dataPerPage) === 0) {
      pages = 1
    } else {

      pages = Math.ceil(countPriority/Number(dataPerPage));
    }

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({data, count: countPriority, pages: pages, starnewpage: defaultStarnewpage, currentpage: start});
    })
  })
}

// выборка всех авторов
export const getAllAuthor = async(req, res) => {

  const q = "SELECT DISTINCT author FROM notes";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({data});
  })
}

// выборка всех приоритетов
export const getAllPriiority = async(req, res) => {

  const q = "SELECT DISTINCT priority FROM notes";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({data});
  })
}

// выбор значений по автору
export const getNotesByAuthor = async(req, res) => {
  
  const rowperpage = 4;
  const page = 0;

  const author = req.query.author;

  if (author !== 'Выбор автора') {

    const sqlcountauthor = "SELECT COUNT(*) FROM notes WHERE author=?";
    const sqlauthor = `SELECT * FROM notes WHERE author=?`;

    db.query(sqlcountauthor, [author], (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)';
      const countPriority = data[0][property];
      pages = Math.ceil(countPriority/rowperpage);

      db.query(sqlauthor, [author], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({data, count: countPriority, pages: pages});
      })
    })
    }
    else {
      const sqlcountnotes = "SELECT COUNT(*) FROM notes";
      const sqlnotes = `SELECT * FROM notes LIMIT ${page}, ${rowperpage}`; 

      db.query(sqlcountnotes, [author], (err, data) => {
        if (err) return res.status(500).json(err);
  
        const property = 'COUNT(*)';
        const countPriority = data[0][property];
        pages = Math.ceil(countPriority/rowperpage);
  
        db.query(sqlnotes, [author], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({data, count: countPriority, pages: pages});
        })
      })
    }
}

// выбор значений по автору и приоритету
export const getNotesByAuthorAndPriority = async(req, res) => {

  const page = 0;

  const priority = req.query.priority;
  const author = req.query.author;

  if (priority !== 'all' && author !== 'Выбор автора' && author !== '' && priority !== '') {

    const sqlcountauthorandpriority = "SELECT COUNT(*) FROM notes WHERE priority=? AND author=?";
    const sql = `SELECT * FROM notes WHERE priority=? AND author=?`;

    db.query(sqlcountauthorandpriority, [priority, author], (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)';
      const countPriority = data[0][property];
      pages = Math.ceil(countPriority/rowperpage);

      db.query(sql, [priority, author], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({data, count: countPriority, pages: pages});
      })
    })
    }
    else if (priority !== 'all' && priority !== 'Выбор приоритета' && author === '' || author === 'Выбор автора' && priority !== '') {

      const sqlcountpriority = "SELECT COUNT(*) FROM notes WHERE priority=?";
      const sqlpriority = `SELECT * FROM notes WHERE priority=? LIMIT ${page}, ${rowperpage}`;
  
      db.query(sqlcountpriority, [priority], (err, data) => {
        if (err) return res.status(500).json(err);
  
        const property = 'COUNT(*)';
        const countPriority = data[0][property];
        pages = Math.ceil(countPriority/rowperpage);
  
        db.query(sqlpriority, [priority], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({data, count: countPriority, pages: pages});
        })
      })
      }
      else if (author !== 'Выбор автора' && author !== '') {

        const sqlcountauthor = "SELECT COUNT(*) FROM notes WHERE author=?";
        const sqlauthor = `SELECT * FROM notes WHERE author=?`;
        
        db.query(sqlcountauthor, [author], (err, data) => {
          if (err) return res.status(500).json(err);
      
          const property = 'COUNT(*)';
          const countPriority = data[0][property];
          pages = Math.ceil(countPriority/rowperpage);
      
          db.query(sqlauthor, [author], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({data, count: countPriority, pages: pages});
          })
        })
      }
}

// выбор значений по приоритету
// если не указан, то выборка всех заметок
export const getNotesByPriority = async(req, res) => {

  const rowperpage = 4;
  const page = 0;

  const priority = req.query.priority;

  if (priority !== 'all') {
    
    const sqlcountpriority = "SELECT COUNT(*) FROM notes WHERE priority=?";
    const sqlpriority = `SELECT * FROM notes WHERE priority=? LIMIT ${page}, ${rowperpage}`;

    db.query(sqlcountpriority, [priority], (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)';
      const countPriority = data[0][property];
      pages = Math.ceil(countPriority/rowperpage);

      db.query(sqlpriority, [priority], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({data, count: countPriority, pages: pages});
      })
    })
    }
    else {
      const sqlcountnotes = "SELECT COUNT(*) FROM notes";
      const sqlnotes = `SELECT * FROM notes ORDER BY ID ASC LIMIT ${page}, ${rowperpage}`;

      db.query(sqlcountnotes, (err, data) => {
        if (err) return res.status(500).json(err);

        const property = 'COUNT(*)'
        const countNotes = data[0][property];
        pages = Math.ceil(countNotes/rowperpage);

        db.query(sqlnotes, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({data, count: countNotes, pages: pages});
        })
      })
    }
}

// поиск по заголовку
export const searchNotesByTitle = async(req, res) => {
  let page = 0;

  const search = req.query.search;

  const sqlcountsearch = `SELECT COUNT(*) FROM notes WHERE title LIKE '%${search}%'`;
  const sqltitlesearch = `SELECT * FROM notes WHERE title LIKE '%${search}%' LIMIT ${page}, ${rowperpage}`;
  db.query(sqlcountsearch, (err, data) => {
    if (err) return res.status(500).json(err);

    const property = 'COUNT(*)'
    const countNotes = data[0][property];
    pages = Math.ceil(countNotes/rowperpage);

    db.query(sqltitlesearch, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({data, count: countNotes, pages: pages});
    })
  })

}
export const updateNotePriority = async(req, res) => {
  const priority = req.query.priority;
  const priorityid = req.query.priorityid;

  const sqlupdate = `UPDATE notes SET priority=? WHERE id=?`;
  db.query(sqlupdate, [priority, priorityid],(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({data});
  })
}

// пагинация nextpage с поиском по приоритету и заголовку
export const nextPageAndPagination = async(req, res) => {
  let starttwo = 0;
  let page = Number(req.query.currentpage) || 0;
  let starnewpage = null;

  let prioritynext = req.query.prioritynext;
  let searchvaluenext = req.query.searchvaluenext

  if (prioritynext === 'low' || prioritynext === 'middle' || prioritynext === 'high' && prioritynext !== 'Выбор приоритета') {

    const sqlcountpriority = "SELECT COUNT(*) FROM notes WHERE priority=?";
    const sqlpriority = `SELECT * FROM notes WHERE priority=? ORDER BY ID ASC LIMIT ${Number(page) * rowperpage}, ${rowperpage}`;

    db.query(sqlcountpriority, [prioritynext], (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)'
      const countNotes = data[0][property];
      pages = Math.ceil(countNotes/rowperpage);

      db.query(sqlpriority, [prioritynext], (err, data) => {
        if (err) return res.status(500).json(err);

        starnewpage = starttwo;
        ++starnewpage;

        return res.status(200).json({data, count: countNotes, pages: pages, starnewpage: starnewpage, currentpage: page});
      })
    })
  } else if (searchvaluenext !== null && searchvaluenext !== '' && searchvaluenext !== undefined) {
    const countsql = `SELECT COUNT(*) FROM notes WHERE title LIKE '${searchvaluenext}%'`;

    db.query(countsql, (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)'
      const countNotes = data[0][property];
      pages = Math.ceil(countNotes/rowperpage);
      
      const sql = `SELECT * FROM notes WHERE title LIKE '${searchvaluenext}%' LIMIT ${Number(page) * rowperpage}, ${rowperpage}`;

      db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);

        starnewpage = starttwo;
        ++starnewpage;

        return res.status(200).json({data, count: countNotes, pages: pages, starnewpage: starnewpage, currentpage: page});
      })
    })
  } else {
    const sqlcountnotes = "SELECT COUNT(*) FROM notes";
    const sqlnotes = `SELECT * FROM notes ORDER BY id ASC LIMIT ${Number(page) * rowperpage}, ${rowperpage}`;

    db.query(sqlcountnotes, (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)';
      const countPriority = data[0][property];
      pages = Math.ceil(countPriority/rowperpage);

      starnewpage = starttwo;
      ++starnewpage;

      db.query(sqlnotes, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({data, count: countPriority, pages: pages, starnewpage: starnewpage, currentpage: page});
      })
    })
  }
}

// пагинация previouspage с поиском по приоритету и заголовку
export const prevPageAndPagination = async(req, res) => {
  let starttwo = 0;
  let page = Number(req.query.currentpage) || 0;
  let starnewpage = null;

  const priorityprev = req.query.priorityprev;
  const searchvalueprevious = req.query.searchvalueprevious;

  if (priorityprev === 'low' || priorityprev === 'middle' || priorityprev === 'high') {
    const sqlcountpriority = "SELECT COUNT(*) FROM notes WHERE priority=?";
    const sqlpriority = `SELECT * FROM notes WHERE priority=? ORDER BY ID ASC LIMIT ${Number(page) * rowperpage}, ${rowperpage}`;

    db.query(sqlcountpriority, [priorityprev], (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)'
      const countNotes = data[0][property];
      pages = Math.ceil(countNotes/rowperpage);

      db.query(sqlpriority, [priorityprev], (err, data) => {
        if (err) return res.status(500).json(err);

        starnewpage = starttwo;
        ++starnewpage;

        return res.status(200).json({data, count: countNotes, pages: pages, starnewpage: starnewpage, currentpage: page});
      })
    })
  } else if (searchvalueprevious !== null || searchvalueprevious !== '' && searchvalueprevious !== undefined) {
    const countsql = `SELECT COUNT(*) FROM notes WHERE title LIKE '${searchvalueprevious}%'`;

    db.query(countsql, (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)'
      const countNotes = data[0][property];
      pages = Math.ceil(countNotes/rowperpage);

      const sql = `SELECT * FROM notes WHERE title LIKE '${searchvalueprevious}%' LIMIT ${Number(page) * rowperpage}, ${rowperpage}`;

      db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);

        starnewpage = starttwo;
        ++starnewpage;

        return res.status(200).json({data, count: countNotes, pages: pages, starnewpage: starnewpage, currentpage: page});
      })
    })
  } else {
    const sqlcountallnotes = "SELECT COUNT(*) FROM notes";
    const sql = `SELECT * FROM notes ORDER BY id ASC LIMIT ${Number(page) * rowperpage}, ${rowperpage}`;

    db.query(sqlcountallnotes, (err, data) => {
      if (err) return res.status(500).json(err);

      const property = 'COUNT(*)'
      const countNotes = data[0][property];
      pages = Math.ceil(countNotes/rowperpage);

      db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);

        starnewpage = starttwo;
        ++starnewpage;

        return res.status(200).json({data, count: countNotes, pages: pages, starnewpage: starnewpage, currentpage: page});
      })
    })
  }
}
