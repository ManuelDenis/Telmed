import axios from "axios";

const Logout = () => {

    const handleLogout = async () => {
        axios.post('/api/auth/logout/')
      .then(response => {
        localStorage.removeItem('token');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Eroare la logout:', error);
      });
  };
    handleLogout();




}

export default Logout