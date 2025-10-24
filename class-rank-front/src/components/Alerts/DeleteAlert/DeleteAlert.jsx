import Swal from 'sweetalert2'
import './DeleteAlert.css'

export async function DeleteAlert(props) {
  const { 
    title, 
    text, 
    icon, 
    ConfirmTitle, 
    ConfirmText, 
    ConfirmIcon,
    showSuccessAlert = true 
  } = props;
  
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        container: 'swal-container',
        popup: 'swal-popup shadow-lg',
        header: 'swal-header',
        title: 'swal-title text-dark fw-bold',
        content: 'swal-content',
        htmlContainer: 'swal-text text-muted',
        confirmButton: 'btn btn-danger mx-2 px-4',
        cancelButton: 'btn btn-outline-secondary mx-2 px-4',
        actions: 'swal-actions d-flex justify-content-center gap-2',
        icon: 'swal-icon'
      },
      buttonsStyling: false,
      background: '#ffffff',
      color: '#495057',
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      focusConfirm: false,
      focusCancel: true
    });

    const result = await swalWithBootstrapButtons.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });

    return result.isConfirmed === true;
    
  } catch (error) {
    console.error('Error en DeleteAlert:', error);
    return false;
  }
}
