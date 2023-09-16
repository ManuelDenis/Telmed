import axios from "axios";

const Logout = () => {

    const handleLogout = async () => {
      window.location.href = '/Category';
        axios.post('/logout/')
      .then(response => {
        localStorage.removeItem('token');
        window.location.href = '/Category';
      })
      .catch(error => {
        console.error('Eroare la logout:', error);
      });
  };
    handleLogout();
}

export default Logout