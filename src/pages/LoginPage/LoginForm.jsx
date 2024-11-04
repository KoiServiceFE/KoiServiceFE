import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../stores/slices/authSlice";
import { Form, Button } from "react-bootstrap";
import UserRole from "../../common/constant/UserRole";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginSubmit = async (data) => {
    try {
      const response = await dispatch(login(data));
      const resData = response.payload;

      if (resData && resData.accessToken) {
        toast.success("Login successful!");
        if (resData.userInfo.roleId == UserRole.ADMIN) {
          navigate("/admin/doctor-schedule");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      toast.error("Login failed! Please check your Username and Password.");
      console.error("Login error:", error);
    }
  };

  return (
    <Form
      noValidate
      onSubmit={handleSubmit(onLoginSubmit)}
      className="form"
      id="login-form"
    >
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Your Password"
          {...register("password", {
            required: "Password is required",
          })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        className="btn-submit"
        type="submit"
        style={{ borderRadius: "30px", background: "#A52A2A", border: "none" }}
      >
        Sign In
      </Button>
    </Form>
  );
}
