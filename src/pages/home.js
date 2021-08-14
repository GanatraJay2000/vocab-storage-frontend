import React, { useState, useEffect } from 'react';
import { getWords } from '../util/api';
import MyCarousel from '../components/carousel';

const Home = () => {
    const [words, setWords] = useState([]);   
    useEffect(() => {
		(async () => {
            const data = await getWords().catch(() => undefined);
            let datas = data.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);            
            setWords(datas);			            
        })();
    }, []);
    const titleCase = (str) => {
        return str.replace(/\w\S*/g, (t) => { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase() });
    }
    const firstWordCap = (str) => {
        return str.replace(str.charAt(0), str.charAt(0).toUpperCase());
    }

    return (<>
        <a href="/words" className="text-dark text-decoration-none position-md-absolute"><i className="bi bi-chevron-left" aria-hidden="true"></i> Words</a>
        <div className="mt-md-5 mt-4 w-100 d-flex justify-content-center">
            <div className="col-md-4 col-12">
                <h2 className="text-center mb-4">Cards</h2>
                {
                words && (<>
                    <MyCarousel>
                        {                        
                            words?.map((w, key) => {
                                return (<>
                                <div className="">
                                    <div className="px-md-2 px-1 py-2">
                                        <div className="shadow-sm card border-0 text-center">                                        
                                            <div className="p-5">
                                                <h4 className="fw-bold">{titleCase(w.word)}</h4>
                                                    <p>{firstWordCap(w.description)}.</p>
                                                    {
                                                        w.tags?.map((tag, key) => {
                                                            if (tag === "") return (<></>);
                                                            return (<>
                                                                <button
                                                                    key={key}                                                        
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
                                </>)
                            })                        
                        }                              
                    </MyCarousel>
                </>)
                }        
            </div>
        </div>
    </>);
}

export default Home;