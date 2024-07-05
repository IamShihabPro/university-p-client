import { Button } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/feature/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/feature/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: 'A-0001',
      password: 'password',
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Loading')

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
  
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.accessToken) as TUser
      // console.log(user)
  
  
      dispatch(setUser({user: user, token: res.data.accessToken}))
      // console.log(res)
      toast.success('Logged In', {id: toastId, duration: 2000})
      navigate(`/${user.role}/dashboard`)
    } catch (error) {
      toast.error("Something went wrong", {id: toastId, duration: 2000})
    }

  
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register('userId')} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register('password')} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;