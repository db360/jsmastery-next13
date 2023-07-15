import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, getProjectByIdQuery, getUserQuery, projectsQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

// Tenemos que comprobar el environment donde nos encontramos, segun si es producción o no, vamos a coger los datos del .env o les damos los datos local si estamos en dev

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : ' http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGrapQLRequest = async(query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (error) {
        throw error;
    }
}

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGrapQLRequest(getUserQuery, { email })
}

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name: name,
            email: email,
            avatarUrl: avatarUrl
        }
    }
    return makeGrapQLRequest(createUserMutation, variables)
}

export const fetchToken = async() => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const uploadImage = async(imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({path: imagePath})
        })

        return response.json();

    } catch (error) {
        throw error;
    }
}

export const createNewProject = async(form: ProjectForm, creatorId:string, token:string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`);

        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        }

        return makeGrapQLRequest(createProjectMutation, variables)
    }
}

export const fetchAllProjects = async(category?: string, endCursor?: string) => {

    client.setHeader('x-api-key', apiKey);

    return makeGrapQLRequest(projectsQuery, { category, endCursor});
}

export const getProjectDetails = (id: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGrapQLRequest(getProjectByIdQuery, {id})
}