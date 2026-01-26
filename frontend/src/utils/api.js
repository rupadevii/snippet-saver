const URL = import.meta.env.VITE_API_URL;

export const fetchAPI = async (path, {formData, token}) => {
    let body;
    let method = formData ? "POST" : "GET";
    let headers = token ? {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
    } : {
        "Content-Type":"application/json",
    }
    if(formData){
        body = JSON.stringify(formData)
    }
    try{
        const res = await fetch(`${URL}/${path}`, {
            method,
            headers,
            body
        });

        if(!res.ok){
            throw {error:"Something went wrong"}
        }
        const data = await res.json();
        return data
    }
    catch(error){
        console.log(error);
    }
}
