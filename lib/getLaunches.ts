"use server"

const getLaunches = async () => {
    try {
        const response = await fetch(process.env.SPACEX_API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching launches:', error);
        // Handle errors gracefully (e.g., show error message)
    }
}

export default getLaunches;
