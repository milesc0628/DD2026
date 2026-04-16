"use client";
import { useState } from "react";


export default function NewDestinationPage(){
    const [formData, setFormData] = useState({
        name:"",
        page:"",
        description:"",
        image: null as File | null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange =(e: React.ChangeEvent<HTMLInputElement, HTMLTextAreaElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        }
    };

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            console.log("Form submitted:", formData);
            const body = new FormData();
            body.append("name", formData.name);
            body.append("page", formData.page);
            body.append("description", formData.description);
            if (formData.image){
                body.append("image", formData.image);
            }

            try{
                const response = fetch ("http://localhost:3001/api/destinations", {
                    method: "POST",
                    body: body
                });
                if (!response.ok){
                    throw new Error("Failed to add destination");
                }
            }catch (err){
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
            }

return(
<div className="max-w-[600px] w-full">
<h1 className="text-3xl font-bold">Add new Destination</h1>
<form className="mt-4" onSubmit={handleSubmit}>
<div className="mb-4">
<label className="block w-full fontbold" htmlFor="name">
Name:
</label>
<input 
type="text"
id="name"
name="name"
value={formData.name}
onChange={handleChange}
className="border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
></input>
</div>
<div className="mb-4">
<label className="block w-full fontbold" htmlFor="description">
Description:
</label>
<textarea
id="description"
name="description"
className="border-gray-300 rounded py-2 px-3
focus:outline-none focus:ring-2 focus:ring-blue-500"
onChange={handleChange}
value={formData.description}
/>

</div>
<div className="mb-4">
<label className="block w-full fontbold" htmlFor="image">
Image:
</label>
<input 
type="file"
id="image"
name="image"
accept="image/*"
onChange={handleFileChange}
className="border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
></input>
</div>
<div className="mb-4">
    {error && <p className="text-red-500">{error}</p>}
<button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
Add Destination
</button>
</div>
</form>
</div>
)}