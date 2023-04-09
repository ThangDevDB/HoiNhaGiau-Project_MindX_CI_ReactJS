import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  name: yup.string().trim().required()
})

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Xác nhận mật khẩu')
    .min(5, 'Độ dài từ 5-160 ký tự ')
    .max(160, 'Độ dài từ 5-160 ký tự ')
    .oneOf([yup.ref(refString)], 'Mật khẩu xác nhận không khớp') // tham chiếu đến giá trị new password
}

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự!'),
  numberPhone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự!'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự!'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type Schema = yup.InferType<typeof schema>
export type UserSchema = yup.InferType<typeof userSchema>
