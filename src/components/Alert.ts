import Swal from 'sweetalert2';
class Alert{
 async success (type: string,text:string,) {
        if (type === "success") {
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: text,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        }
        else if(type === "error"){
            Swal.fire({
                icon: 'question',
                title: 'Error',
                text: text,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        }
        else if(type==="toast")
        {
            const toast =Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                padding: '2em',
            });
            toast.fire({
                icon: 'success',
                title: text,
                padding: '2em',
            });
        }
    }
}
export default new Alert();