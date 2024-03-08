import API from "../config/axiosConfig";


export const get = (id) => {
    id = id || '';
    return API.get(`events/${id}`)
};

export const add = (body) => {
    return API.post(`events`,body)
};
export const update = (id, body) => {
	return API.put(`events/${id}`, body);
};

export const find = (id) => {
	return API.get(`events/${id}`);
};

export const deleteEvent = async (eventId) => {
	try {
		await API.delete(`events/${eventId}`);
		console.log("Event deleted successfully");
	} catch (error) {
		console.error("Error deleting event:", error);
		throw error;
	}
};