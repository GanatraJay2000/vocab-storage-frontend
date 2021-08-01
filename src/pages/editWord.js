import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getWord, editWord } from '../util/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditWord = () => {
    let params = useParams();
    let id = params.id;
    const history = useHistory();
    const [currWord, setCurrWord] = useState({});

    useEffect(() => {
		(async () => {
            const data = await getWord(id).catch(() => undefined);
            console.log(data);
			setCurrWord(data);			
        })();
    }, [id]);    
    useEffect(() => {
		(async () => {
            const data = await getWord(id).catch(() => undefined);
            console.log(data);
			setCurrWord(data);			
        })();
    }, [id]);    
  
    const formik = useFormik({
        initialValues: {
            word: currWord.word,
            description: currWord.description,
            tags: currWord.tags?.join(", "),
            priority: currWord.priority,
            username: 'Jay',
            id: id,
        },
        enableReinitialize:true,
        validationSchema: Yup.object({
            word: Yup.string()                
                .required('Required'),
            description: Yup.string()                
                .required('Required'),
            tags: Yup.string(),
            priority: Yup.number(),
        }),
        onSubmit:  async (values) => {                 
            let updating = await editWord(values);
            console.log(updating);         
            history.push({ pathname: `/words` });
        },
   });


    return (<>
        {
            currWord && (
        <div className="w-100 d-flex justify-content-center align-items-center">
                    <div className="col-md-6 col-12">
                        <a href="/words" className="text-dark">Back</a>
                        <div className="card border-0 shadow-sm rounded">
                <div className="px-3 pt-4">
                    <h2 className="fw-bold text-center">Edit Word</h2>
                    <form onSubmit={formik.handleSubmit} className="p-4">
                            <h2 className="fw-light mb-3">Add Word</h2>
                            <div className="mb-3">
                                <label htmlFor="word">Word</label>
                                <input
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
                                    type="text"
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
                                <button data-bs-dismiss="modal" aria-label="Close" type="submit" className="btn btn-primary px-4">Submit</button>
                            </div>
                        </form>
                </div>
            </div>
                    </div>
                    </div>
                )
        }
    </>);
}

export default EditWord;