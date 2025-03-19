'use client'
 
import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Button from '../components/Button'
import useStore from '../hooks/useStore'
import Input from '../components/Input'
import { LoginRequestType, RegisterRequestType } from '../types/requests.type'


export type CredentialsInputProps = {
  label: string
  buttonLabel: string
  onClick: (props: LoginRequestType | RegisterRequestType) => Promise<void>
}


const CredentialsInput: FC<CredentialsInputProps> = ({
  label,
  buttonLabel,
  onClick
}) => {
  const { loginEmail } = useStore()
  const { setLoginEmail } = useStore()
  const { loginPassword } = useStore()
  const { setLoginPassword } = useStore()
  const { authError } = useStore()
  const { setAuthError } = useStore()
  const onClickWithChecks = async () => {
    if (loginEmail.length < 7 || !loginEmail.includes('@')) {
      setAuthError('Некорректный email')
      return
    }
    if (loginPassword.length < 7) {
      setAuthError('Пароль слишком короткий')
      return
    }
    try {
      await onClick({
        email: loginEmail,
        password: loginPassword,
      })
      setLoginEmail('')
      setLoginPassword('')
    } catch (err: any) {
      if (typeof err === 'string')
        setAuthError(err)
    }
  }

  useEffect(() => setAuthError(''), [setAuthError])

  const router = useRouter()
  const { logged } = useStore()

  useEffect(() => {
    if (logged)
      router.push('/account')
  }, [logged, router])
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 col-md-6 col-lg-4'>
          <h3 className='h3 mb-5'>
            {label}
          </h3>
          <Input
            label='email'
            value={loginEmail}
            onChange={value => {
              setAuthError('')
              setLoginEmail(value)
            }}
            className='mb-2'
          />
          <Input
            label='password'
            value={loginPassword}
            onChange={value => {
              setAuthError('')
              setLoginPassword(value)
            }}
            className='mb-2'
          />
          <Button
            black
            className='mb-2'
            onClick={onClickWithChecks}
          >
            {buttonLabel}
          </Button>
          {authError.length > 0 && `ERR: ${authError}`}
        </div>
      </div>
    </div>
  )
}


export default CredentialsInput
