import Swal from 'sweetalert2';

// Base styles shared between both configurations
const baseStyles = {
  background: '#fff',
  customClass: {
    popup: `
      !rounded-none 
      !border-2 
      !border-[#061222]
      [background-image:linear-gradient(to_right,#A5A696_1px,transparent_1px),linear-gradient(to_bottom,#A5A696_1px,transparent_1px)]
      [background-size:20px_20px]
      !shadow-[4px_4px_0px_0px_#061222]
    `,
    title: 'text-lg font-bold text-[#061222]',
    htmlContainer: 'text-sm text-[#061222]',
    confirmButton: 'bg-[#061222] text-white rounded-none hover:bg-[#162133] border-2 border-[#061222]',
    cancelButton: 'rounded-none border-2 border-[#061222] text-[#061222] hover:bg-gray-100',
  },
  iconColor: '#061222',
};

// Create a custom SweetAlert instance with default configuration
const CustomSwal = Swal.mixin(baseStyles);

// Preset configurations for toast notifications
export const Toast = CustomSwal.mixin({
  toast: true,
  position: 'bottom-end',
  timer: 1500,
  timerProgressBar: true,
  showConfirmButton: false,
  width: '300px',
  customClass: {
    ...baseStyles.customClass,
    popup: `
      !rounded-none 
      !border-2 
      !border-[#061222]
      [background-image:linear-gradient(to_right,#A5A696_1px,transparent_1px),linear-gradient(to_bottom,#A5A696_1px,transparent_1px)]
      [background-size:20px_20px]
      !shadow-[2px_2px_0px_0px_#061222]
      !mt-2
      !mr-2
    `,
  },
});

export default CustomSwal; 