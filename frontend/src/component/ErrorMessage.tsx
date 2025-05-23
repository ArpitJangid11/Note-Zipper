import { type ReactNode } from 'react'
import { Alert } from 'react-bootstrap'
interface ErrorMessageProps {
  variant?: string;
  children: ReactNode;
}
const ErrorMessage = ({ variant = "info", children }: ErrorMessageProps) => {
  return (
    <Alert variant={variant} style={{fontSize:20}}>
      <strong>{children}</strong>
    </Alert>
  )
}

export default ErrorMessage
