import Swal from "sweetalert2";

export const swal = Swal.mixin({
  background: "#1e293b",
  color: "#fff",
  confirmButtonColor: "#2DD4BF",
  cancelButtonColor: "#ef4444",
  iconColor: "#2DD4BF",
  customClass: {
    popup: "rounded-lg",
    title: "text-lg font-semibold",
    htmlContainer: "text-sm text-gray-300",
  },
});
