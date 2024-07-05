export const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
};
