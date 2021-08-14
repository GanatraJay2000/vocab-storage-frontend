import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getWords, addWord, deleteWord } from '../util/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Home = () => {
    const history = useHistory();
    const [words, setWords] = useState([]);
    const [backUpWords, setBackUpWords] = useState([]);
    const [deleteAllowed, setDeleteAllowed] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [nameSort, setNameSort] = useState('');
    const [prioritySort, setPrioritySort] = useState('');    

    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            document.getElementById("word").focus();
        }, 200);        
    }, [modalOpened])

    const formik = useFormik({
        initialValues: {
            word: '',
            description: '',
            tags: '',
            priority: 0,
            username: 'Jay'
        },
        validationSchema: Yup.object({
            word: Yup.string()               
                .required('Required'),
            description: Yup.string()                
                .required('Required'),
            tags: Yup.string(),
            priority: Yup.number(),
        }),
        onSubmit: async (values) => {
            console.log(values);
            let adding = await addWord(values);
            console.log(adding);
            let nwa = wordCount + 1;
            setWordCount(nwa);
            formik.resetForm();
        },
   });
    
    useEffect(() => {
		(async () => {
            const data = await getWords().catch(() => undefined);            
			setWords(data);
			setBackUpWords(data);
        })();
    }, [wordCount]);  
    
    
    document.addEventListener('keyup', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {                    
            var btn = document.querySelector('.addWordModalOpener');
            btn.click();
            
        }
    });
    
    const word_sort = (objs) => {
        objs.sort((a, b) => (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0))
        return objs;
    }
    const priority_sort = (objs) => {
        objs.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0))
        return objs;
    }


    const titleCase = (str) => {
        return str.replace(/\w\S*/g, (t) => { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase() });
    }
    const firstWordCap = (str) => {
        return str.replace(str.charAt(0), str.charAt(0).toUpperCase());
    }

    return (<>
        <div className="d-flex flex-wrap flex-column flex-md-row align-items-center justify-content-between pb-4">
            <div className="d-flex justify-content-between col-12 col-md-1">
                <a href="/" className="text-dark text-decoration-none">
                    <h2 className="m-0">Words</h2>
                </a>
                <div className="d-block d-md-none">
                <button className="btn btn-outline-secondary border-1 border-md-0 shadow-none  ms-md-4 ms-0"
                    type="button" data-bs-toggle="collapse" data-bs-target="#sortRow">
                    <i className="fas fa-ellipsis-h    "></i>
                </button>
            </div>
                <div className="d-block d-md-none">
                    <button                       
                        type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>            
            <div className="col w-100 mt-4 mt-md-0 me-md-5 ms-md-3 mx-0">
                <div className="input-group border-0">
                    <span className="input-group-text bg-light border-0" id="basic-addon1">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        id="search"
                        type="text"
                        className="form-control border-0 shadow-sm rounded text-secondary"
                        placeholder="Search a Word"
                        autocomplete="off"
                        onKeyUp={(e) => {
                            let key = e.key === "Backspace";                            
                            let val = e.target.value.toLowerCase();
                            let bW = [...backUpWords];
                            let nW = [...words];
                            if (key) { nW = bW; }                                                    
                            if (val !== "") {
                                let result = nW.filter(w => (w.word.includes(val) || w.description.includes(val) || w.tags.find(a => a.includes(val))));
                                setWords(result);
                            }
                            else setWords(bW);
                        }}                        
                        />
                    <div className="ms-3">
                        <button
                            onClick={() => {
                                let bW = [...backUpWords];
                                setWords(bW);
                                document.getElementById('search').value = "";
                                setPrioritySort("");
                                setNameSort("");
                            }}
                            className="btn btn-danger m-0">
                        &times;
                    </button>
                    </div>
                </div>                
            </div>
            <div className="d-md-block d-none">
                <button
                    onClick={() => {                        
                        setModalOpened(true)
                    }}    
                    type="button" className="btn  btn-primary addWordModalOpener" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fas fa-plus me-2"></i>Add Word
                </button>
            </div>
            <div className="d-md-block d-none">
                <button className="btn btn-outline-secondary border-0 shadow-none  ms-4"
                    type="button" data-bs-toggle="collapse" data-bs-target="#sortRow">
                    <i className="fas fa-ellipsis-v    "></i>
                </button>
            </div>
        </div>
        <div className="collapse" id="sortRow">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex flex-wrap">
                    <div className="my-2">
                        <button
                            onClick={() => {                            
                                let result = word_sort([...words]);
                                if (nameSort === "up") {
                                    result.reverse();
                                    setNameSort('down');
                                }
                                else if (nameSort === "") setNameSort('up');                            
                                else setNameSort('up');
                                
                                setWords(result);
                            }}
                            className="btn btn-outline-secondary">
                            Sort By Name <i className={`fas fa-caret-${nameSort} ms-2`}></i>
                        </button>
                    </div>
                    <div className="ms-md-4 my-2">
                        <button
                            onClick={() => {                            
                                let result = priority_sort([...words]);
                                if (prioritySort === "up") {
                                    result.reverse();
                                    setPrioritySort('down');
                                }
                                else if (prioritySort === "") setPrioritySort('up');                            
                                else setPrioritySort('up');
                                
                                setWords(result);
                            }}
                            className="btn btn-outline-secondary">
                            Sort By Priority <i className={`fas fa-caret-${prioritySort} ms-2`}></i>
                        </button>
                    </div>
                </div>
                <div className="">
                    <button className="btn btn-outline-success border-0 shadow-none px-5">{words.length} Words</button>
                </div>
                <div className=" my-2">
                    <button
                        onClick={() => {
                            var next = !deleteAllowed;
                            setDeleteAllowed(next);
                        }}
                        className="btn btn-secondary w-100">
                        Allow Delete Toggle
                    </button>
                </div>
            </div>
        </div>
        <div className="row pt-4">
            {
                words && (<>
                    {
                        words?.map((w, key) => {
                        let color = "";
                        let btnClr = "danger";                    
                        if (w.priority>0) { color = "bg-info text-white"; btnClr = "dark"; }
                        if (w.priority>1) { color = "bg-warning text-white"; btnClr = "dark"; }
                        if (w.priority>2) { color = "bg-secondary text-white"; btnClr = "dark"; }
                        if (w.priority>3) { color = "bg-danger text-white"; btnClr = "dark"; }
                        if (w.priority>4) { color = "bg-dark text-white"; btnClr = "dark"; }
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                <div
                                    key={key}
                                    className={`card border-0 shadow-sm overflow-hidden ${color}`}                                
                                >
                                    {
                                        deleteAllowed && (<>
                                    <button
                                        onClick={async () => {
                                            // eslint-disable-next-line no-restricted-globals
                                            if (confirm('Are you sure you want to delete the Word: '+ w.word)) {
                                                let dW = await deleteWord(w._id);
                                                console.log(dW);
                                                let nwa = wordCount - 1;
                                                setWordCount(nwa);
                                            }
                                        }}
                                        className={`position-absolute top-0 end-0 btn btn-outline-${btnClr} border-0 fs-5 lh-sm shadow-none`} style={{ borderRadius: "0 0.25rem 0 0.25rem" }}>
                                        &times;
                                    </button>
                                            </>)
                                    }
                                    <div className="py-lg-5 px-lg-4 p-md-4 p-3 py-4 w-100 h-100 d-flex justify-content-center align-items-center">
                                        <div className="text-center">
                                            <h2 className="fw-bold"
                                            onDoubleClick={() => {
                                        history.push({ pathname: `/edit-word/${w._id}` });
                                    }}
                                    style={{ cursor:"pointer" }}
                                            >{titleCase(w.word)}</h2>
                                            <p>{firstWordCap(w.description)}.</p>                                       
                                            {                                            
                                                w.tags?.map((tag, key) => {
                                                    if (tag === "") return (<></>);
                                                    return (<>
                                                        <button
                                                            key={key}
                                                            onClick={() => {
                                                                document.getElementById('search').value = titleCase(tag);
                                                                let val = tag.replace(/^\s+|\s+$/g, "");
                                                                console.log(val);
                                                                let nW = [...backUpWords];
                                                                let result = nW.filter(w => {
                                                                    return w.tags.find(a => a.includes(val));
                                                                });                                                            
                                                                console.log(result);
                                                                setWords(result);
                                                            }}
                                                            className=" m-1 btn btn-sm bg-light text-dark border">
                                                            {titleCase(tag)}
                                                        </button>
                                                    </>);
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                        })
                    }
                </>)                
            }
        </div>        
        <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">                    
                    <div className="modal-body">
                        <button
                            onClick={() => {
                                        setModalOpened(false);
                                    }}
                            type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                        <form onSubmit={formik.handleSubmit} className="p-4">
                            <h2 className="fw-light mb-3">Add Word</h2>
                            <div className="mb-3">
                                <label htmlFor="word">Word</label>
                                <input
                                    autoFocus={true}
                                    id="word"
                                    name="word"
                                    type="text"
                                    className="form-control border-0 shadow-sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.word}
                                />
                                {formik.touched.word && formik.errors.word ? (
                                    <div className="text-danger">{formik.errors.word}</div>
                                    ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    className="form-control border-0 shadow-sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-danger">{formik.errors.description}</div>
                                    ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tags">Tags</label>
                                <input
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    className="form-control border-0 shadow-sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tags}
                                />
                                {formik.touched.tags && formik.errors.tags ? (
                                    <div className="text-danger">{formik.errors.tags}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tags">Priority</label>
                                <input
                                    id="priority"
                                    name="priority"
                                    type="number"
                                    className="form-control border-0 shadow-sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.priority}
                                />
                                {formik.touched.priority && formik.errors.priority ? (
                                    <div className="text-danger">{formik.errors.priority}</div>
                                ) : null}
                            </div>
                            <div className="">
                                <button
                                    onClick={() => {
                                        setModalOpened(false);
                                    }}
                                    data-bs-dismiss="modal" aria-label="Close" type="submit" className="btn btn-primary px-4">Submit</button>
                            </div>
                        </form>
                    </div>                    
                </div>
            </div>
        </div>        
    </>);
}

export default Home;