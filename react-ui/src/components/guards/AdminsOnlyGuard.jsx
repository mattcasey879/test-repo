import { Navigate } from "react-router-dom";
import { getUserRole } from "../../utils/helpers";
import { ToastContext } from "../../contexts/ToastContext";
import { useContext } from "react";

const AdminsOnlyGuard = ({ children }) => {
  const { showToast } = useContext(ToastContext);
  const role = getUserRole();
  if (role === "admin") {
    return children;
  } else {
    showToast({
      message: "Only Admins have access to this location!",
      severity: "error",
    });
    return <Navigate to="/employees" replace />;
  }
};

export default AdminsOnlyGuard;
