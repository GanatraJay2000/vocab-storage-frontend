import { base } from '../api';


export const getWords = async () => {	
	const res = await fetch(`${base}/vocabs`, {
		headers: { "Content-Type": `application/json` }
	});
    return res.json();
};

export const getWord = async (id) => {
	const res = await fetch(`${base}/vocabs/${id}`, {
		headers: { "Content-Type": `application/json` }
	});
    return res.json();
};

export const addWord = async (req) => {
	req.tags = req.tags.split(",");
	req.word = req.word.toLowerCase();
	req.description = req.description.toLowerCase();
	let data = JSON.stringify(req);
	const res = await fetch(`${base}/vocabs/add`, {
		method: 'POST',
		body: data,
		headers: { "Content-Type": `application/json` }
	}).then(res => res.json());
    return res;
};

export const editWord = async (req) => {
	req.tags = req.tags.split(",");
	req.tags.forEach((tag, key) => {
		req.tags[key] = tag.replace(" ", "");
	})
	req.word = req.word.toLowerCase();
	req.description = req.description.toLowerCase();
	let data = JSON.stringify(req);
	const res = await fetch(`${base}/vocabs/update/${req.id}`, {
		method: 'PATCH',
		body: data,
		headers: { "Content-Type": `application/json` }
	}).then(res => res.json());
    return res;
};

export const deleteWord = async (id) => {	
	const res = await fetch(`${base}/vocabs/${id}`, {
		method: 'DELETE',		
		headers: { "Content-Type": `application/json` }
	}).then(res => res.json());
    return res;
};