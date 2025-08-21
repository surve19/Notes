import axios from 'axios';
import icon from '../src/assets/sticky-note.png';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState({
    id:""
  });

  useEffect(() => {
    axios
    .get("http://localhost:5000/auth/me", { withCredentials: true })
      .then((res) => {
        // setUser(res.data.user); // logged in
        setUser(res.data.user);
        console.log("User data:", res.data.user);
      })
      .catch((err) => {
        setUser(null); // not logged in or token expired
      });
  }, []);

  // const handleLogout = () => {
  //   axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
  //     .then(response => {
  //       console.log(response.data);
  //       window.location.href = '/auth/login'; // Redirect to login page after logout  
  //     })
  //     .catch(error => {
  //       console.error('There was an error logging out!', error);
  //     });
  // }

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
    setUser(user);
    window.location.href = "/auth/login"; // or use navigate if using React Router
  };

  return (
    <div className='p-4 flex justify-between items-center bg-[#03045e]'>
      <div className='flex items-center cursor-pointer' onClick={() => window.location.href = '/'}>
        <img src={icon} className='w-18 h-18' />
        <h3 className='text-3xl font-bold ml-2 font-mono text-white'> Notify </h3>
      </div>
      {console.log("User",user)}
      {user ? (
        <>
          <h3 className={`text-lg font-mono font-bold text-white cursor-pointer`}> Welcome, {user.name || user.email}</h3>
          {/* <button onClick={handleLogout}>Logout</button> */}
          <h3 className={`text-lg font-mono font-bold text-white cursor-pointer`} onClick={handleLogout}>Logout</h3>
        </>
      ) : (
        // <a href="/login">Login</a>
        <a className={`text-lg font-mono font-bold text-white cursor-pointer`} href='/auth/login'>Login</a>
      )}
      {/* <h3 className={`text-lg font-mono font-bold text-white cursor-pointer`} onClick={handleLogout}>Logout</h3> */}
    </div>
  )
}

export default Navbar
