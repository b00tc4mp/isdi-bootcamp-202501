import {Metadata} from 'next'

export const generateMetadata = ({ params }) => {
    return {
        title: `Propiedades ${params.propertiesId}`,
    };
};
export default function PropertiesDetail({params}){
    return(
        <h1>
            {params.propertiesId}
           
        </h1>
    )
}