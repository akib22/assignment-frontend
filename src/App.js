import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Wishlist from './pages/Wishlist';
import Header from './components/Header';
import { useUser } from './contexts/user';
import { getDataFromLocalStorage } from './utils/localStorage';

function App() {
  const [, dispatch] = useUser();

  useEffect(() => {
    const user = getDataFromLocalStorage('user', null);
    const accessToken = getDataFromLocalStorage('accessToken', null);

    dispatch({
      type: 'setUser',
      payload: { user, accessToken },
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
