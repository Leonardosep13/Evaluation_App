import Swal from 'sweetalert2'
import './GenericAlert.css'

export function GenericAlert(props) {
  const { 
    title, 
    text, 
    icon = 'info', 
    confirmButtonText = 'Entendido',
    timer = null,
    timerProgressBar = false,
    allowOutsideClick = true,
    allowEscapeKey = true 
  } = props;

  try {
    const result = Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confirmButtonText,
      timer: timer,
      timerProgressBar: timerProgressBar,
      allowOutsideClick: allowOutsideClick,
      allowEscapeKey: allowEscapeKey,
      customClass: {
        container: 'swal-container',
        popup: 'swal-popup shadow-lg',
        header: 'swal-header',
        title: 'swal-title text-dark fw-bold',
        content: 'swal-content',
        htmlContainer: 'swal-text text-muted',
        confirmButton: getButtonClass(icon),
        actions: 'swal-actions d-flex justify-content-center'
      },
      buttonsStyling: false,
      background: '#ffffff',
      color: '#495057'
    });

    return result.isConfirmed;
  } catch (error) {
    console.error('Error en GenericAlert:', error);
    return false;
  }
}

function getButtonClass(icon) {
  switch (icon) {
    case 'success':
      return 'btn btn-success px-4';
    case 'error':
      return 'btn btn-danger px-4';
    case 'warning':
      return 'btn btn-warning px-4';
    case 'info':
      return 'btn btn-info px-4';
    case 'question':
      return 'btn btn-primary px-4';
    default:
      return 'btn btn-primary px-4';
  }
}

// Funciones específicas para diferentes tipos de alertas
export const ErrorAlert = (title, text) => GenericAlert({
  title,
  text,
  icon: 'error',
  confirmButtonText: 'Entendido'
});

export const SuccessAlert = (title, text, timer = 2000) => GenericAlert({
  title,
  text,
  icon: 'success',
  confirmButtonText: 'Entendido',
  timer: timer,
  timerProgressBar: true
});

export const WarningAlert = (title, text) => GenericAlert({
  title,
  text,
  icon: 'warning',
  confirmButtonText: 'Entendido'
});

export const InfoAlert = (title, text) => GenericAlert({
  title,
  text,
  icon: 'info',
  confirmButtonText: 'Entendido'
});3
