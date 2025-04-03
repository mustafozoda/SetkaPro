import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/useAuth"; // Zustand for auth
import API from "../../services/api"; // Import the centralized API service
import { toast } from "react-hot-toast"; // Toast notifications for feedback

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const login = useAuth((state) => state.login); // Zustand login function
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await API.post("/api/auth/login", data); // API login call
      login(res.data.token, res.data.user); // Store user and token in Zustand
      navigate("/dashboard"); // Redirect to dashboard
      toast.success("Login successful!"); // Success toast notification
    } catch (err) {
      toast.error("Login failed!"); // Error toast notification
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-blue-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-8 bg-white shadow-lg rounded-xl max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Log In
        </button>
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-700">
            Register here
          </a>
        </div>
      </form>
    </div>
  );
}
