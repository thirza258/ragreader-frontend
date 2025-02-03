import axios from "axios";
import { apiBaseUrl } from "../constant";

const submitFile = async (file: File, modelName: string, vectorNumber: number) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_name", modelName);
    formData.append("vector_number", vectorNumber.toString());

    const response = await axios.post(`${apiBaseUrl}/api/v1/file/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",  // Important for file uploads
        },
    });

    return response.data;
};

const generateChat = async (input_message: string) => {
    const response = await axios.post(`${apiBaseUrl}/api/v1/chat/`, {
        input_message: input_message
    }, {
        headers: {
            "Content-Type": "application/json", 
        },
    });

    return response.data;
};

export default {
    submitFile,
    generateChat,
}