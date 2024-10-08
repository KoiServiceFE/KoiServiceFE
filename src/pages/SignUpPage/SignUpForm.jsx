import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../../stores/slices/authSlice";
import { Form, Button } from 'react-bootstrap';

export default function SignUpForm({ onSuccess }) { 
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();

  const onRegisterSubmit = async (data) => {
    console.log('Submitted data:', data); // Kiểm tra dữ liệu trước khi gửi
    try {
      const response = await dispatch(registerUser({
        username: data.username,
        address: data.address,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      }));

      console.log('Redux registration response:', response);
      if (response.error) {
        toast.error('Email has already registered'); 
      } else {
        toast.success("Registration successful!");
        onSuccess(); // chuyển sang login khi success
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onRegisterSubmit)} className="form">
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Your Name"
          {...register("username", { required: "Name is required" })}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Your Address"
          {...register("address", { required: "Address is required" })}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
      </Form.Group>

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
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Your Phone Number"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^0\d{9}$/,
              message: "Phone number must start with 0 and contain exactly 10 digits",
            },
          })}
          isInvalid={!!errors.phoneNumber}
        />
        <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Your Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Repeat Your Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      
      <Button className="btn-submit" type="submit" style={{ borderRadius: "30px", background: "#A52A2A", border: "none" }}>
        Sign Up
      </Button>
    </Form>
  );
}
