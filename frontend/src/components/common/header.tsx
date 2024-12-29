// frontend/src/components/Header.jsx
import { useNavigate } from 'react-router-dom';
import CustomSwal from '@/utils/sweetalert-config';
import { Toast } from '@/utils/sweetalert-config';
import logo from '../../assets/hamong.png';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.location.pathname === '/') {
      Toast.fire({
        title: '이미 홈이랍니다!',
        icon: 'info',
      });
    } else {
      CustomSwal.fire({
        title: '홈으로 돌아갈까요?',
        text: '작성 내용이 사라진답니다!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '돌아갈래요!',
        cancelButtonText: '그냥 있을래요!',
        width: '80%',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-[#061222] px-3 py-2 shadow-md z-50">
      <div className="container flex justify-between items-center">
        {/* Home icon on the left */}
        <div className="flex-none">
          <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#E8EAEA" className="size-8 cursor-pointer hover:stroke-[#1A3EB5] transition-all duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"/>
          </svg>
        </div>

        {/* Logo in center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} alt="logo" className="w-16 h-8" />
        </div>

        {/* Empty div for spacing */}
        <div className="flex-none w-8"></div>
      </div>
    </header>
  );
};

export default Header;
