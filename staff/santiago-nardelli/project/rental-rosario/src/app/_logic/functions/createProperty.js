'use server'
import {validate, errors} from 'com'

 export const createProperty = async(formData) => {
        /*const res = await fetch('https://api.example.com/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: formData.get('title'),
                image: formData.get('image'),
                description: formData.get('description'),
            }),
        });
        if (!res.ok) {
            throw new Error('Failed to create property');
        }
            */
        const propertyName= formData.get('title')
        const propertyImage= formData.get('image')
        const propertyDescription= formData.get('description')

        validate.text(propertyName)
        validate.minLength(propertyName, 3, 'property name')
        validate.maxLength(propertyName, 20, 'property name')
        validate.url(propertyImage)
        validate.text(propertyDescription)
        validate.minLength(propertyDescription, 10, 'property description')
        validate.maxLength(propertyDescription, 200, 'property description')

        if(!propertyName || !propertyImage || !propertyDescription) return
        
        const newProperty ={
            title: propertyName,
            image: propertyImage,
            description: propertyDescription,
            
        }
        console.log('Property created:', newProperty);

    // Devuelve la propiedad creada
    return newProperty;

    }