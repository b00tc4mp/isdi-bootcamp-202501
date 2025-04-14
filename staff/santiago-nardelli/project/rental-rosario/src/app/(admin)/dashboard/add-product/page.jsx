//import crypto from 'crypto';==> para uuid
'use client'
import {createProperty} from '@/app/_logic/index.js'



export default function addProperty() {

   
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const property = await createProperty(formData);
            console.debug('Property created:', property);
            alert('Property added successfully!');
        } catch (error) {
            console.error('Error adding property:', error);
            alert('Failed to add property. Please try again.');
        }
    };
  
    return (
        <div>
            <h1>Add New Property</h1>
            <form  onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        required
                       
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                       
                    />
                </div>
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
}